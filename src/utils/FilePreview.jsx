import { useEffect, useRef, useState } from 'react';
import axiosInstance from '../services/Axios';
import axios from 'axios';

export default function PdfViewerComponent(props) {
	const containerRef = useRef(null);
  const [file,setFile]=useState();
  const [error,setError]=useState();

  async function loadProtectedPDF(documentUrl,container) {

    let PSPDFKit;
    PSPDFKit = await import('pspdfkit');
    axios.get(documentUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      setFile( data );
    })
    .catch((error) => {
      setError( error );
      console.log(error)
    });
    return PSPDFKit.load({
      container,
      document: file,
      toolbarItems: PSPDFKit.defaultToolbarItems.filter(item => item.type !== "print"),
      initialViewState: new PSPDFKit.ViewState({
        sidebarMode: PSPDFKit.SidebarMode.THUMBNAILS
      })
    })
  }

  function isRemoteUrl(url) {
    try {
      const parsedUrl = new URL(url);
      return parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:";
    } catch (error) {
      return false; // Invalid URL
    }
  }

	useEffect(() => {
		const container = containerRef.current;
		let instance, PSPDFKit;
 
    (async function () {
			PSPDFKit = await import('pspdfkit');

			PSPDFKit.unload(container); // Ensure that there's only one PSPDFKit instance.

			instance = await PSPDFKit.load({
				// Container where PSPDFKit should be mounted.
				container,
				// The document to open.
				document: props.document,
				// Use the public directory URL as a base URL. PSPDFKit will download its library assets from here.
				baseUrl: `${window.location.protocol}//${window.location.host}/${import.meta.env.BASE_URL}`,
			});
		})();
		return () => PSPDFKit && PSPDFKit.unload(container);
	}, []);

	return (
		<div
			ref={containerRef}
			style={{ width: '100%', height: '100vh' }}
		/>
	);
}