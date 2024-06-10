import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import './style/rdvItemAgenda.scss';

function RdvItemAgenda({ rdv, rdvType }) {
    const [classRdv, setClassRdv] = useState("");

    useEffect(() => {
        rdvType(rdv);

        const today = new Date().getTime();
        const rdvStart = new Date(rdv.start).getTime();

        if (today > rdvStart) {
            {console.log(today > rdvStart)}
            setClassRdv("past-rdv");
        } else {
            setClassRdv("");
        }
    }, [rdv, rdvType]);

  return (
      <>

          {console.log("rdvs************: ", rdv)}
          <div className={`RDV ${classRdv}`}>
              <div className={`rectangle ${rdv.modeConsultation.mode.toLowerCase()}`} />
              <div className="frame">
                  <div className="text-wrapper">{rdv.start.slice(11, 16)}</div>
                  <div className="fr-d-ric-guimond">
                      {<>{rdv.patient.nom_pat} {rdv.patient.prenom_pat}</>}
                  </div>
              </div>
              {
                  rdv.modeConsultation.mode==="CABINET" && (
                      <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="0.134766" width="16" height="16" rx="8" fill="#C989DD" fill-opacity="0.18"/>
                          <path d="M6.56955 7.61538C6.1083 7.61538 5.66595 7.41278 5.3398 7.05213C5.01365 6.69148 4.83042 6.20234 4.83042 5.69231V4.15385C4.83042 4.05184 4.86706 3.95401 4.93229 3.88188C4.99752 3.80975 5.08599 3.76923 5.17824 3.76923H5.52607C5.61832 3.76923 5.70679 3.72871 5.77202 3.65658C5.83725 3.58445 5.8739 3.48662 5.8739 3.38462C5.8739 3.28261 5.83725 3.18478 5.77202 3.11265C5.70679 3.04052 5.61832 3 5.52607 3H5.17824C4.9015 3 4.63608 3.12157 4.44039 3.33795C4.2447 3.55434 4.13477 3.84783 4.13477 4.15385V5.69231C4.13521 6.12682 4.23103 6.55472 4.414 6.93926C4.59697 7.3238 4.86161 7.65348 5.1852 7.9C5.4961 8.20309 5.74823 8.57269 5.92638 8.98651C6.10453 9.40032 6.20499 9.84976 6.22172 10.3077C6.22172 11.0217 6.47824 11.7065 6.93485 12.2114C7.39146 12.7163 8.01076 13 8.6565 13C9.30225 13 9.92154 12.7163 10.3782 12.2114C10.8348 11.7065 11.0913 11.0217 11.0913 10.3077V9.86923C11.4192 9.77562 11.7049 9.55299 11.895 9.24307C12.085 8.93316 12.1663 8.55724 12.1237 8.18577C12.081 7.8143 11.9173 7.4728 11.6632 7.22526C11.4091 6.97773 11.0821 6.84116 10.7435 6.84116C10.4048 6.84116 10.0778 6.97773 9.82373 7.22526C9.56964 7.4728 9.40591 7.8143 9.36324 8.18577C9.32057 8.55724 9.40189 8.93316 9.59195 9.24307C9.782 9.55299 10.0678 9.77562 10.3956 9.86923V10.3077C10.3956 10.8177 10.2124 11.3069 9.88625 11.6675C9.5601 12.0282 9.11775 12.2308 8.6565 12.2308C8.19526 12.2308 7.7529 12.0282 7.42675 11.6675C7.1006 11.3069 6.91737 10.8177 6.91737 10.3077C6.93498 9.84919 7.03654 9.3994 7.21589 8.98556C7.39525 8.57171 7.64868 8.20241 7.96085 7.9C8.28316 7.65263 8.54645 7.32257 8.72817 6.93808C8.9099 6.5536 9.00466 6.12614 9.00433 5.69231V4.15385C9.00433 3.84783 8.89439 3.55434 8.6987 3.33795C8.50301 3.12157 8.2376 3 7.96085 3H7.61303C7.52078 3 7.43231 3.04052 7.36707 3.11265C7.30185 3.18478 7.2652 3.28261 7.2652 3.38462C7.2652 3.48662 7.30185 3.58445 7.36707 3.65658C7.43231 3.72871 7.52078 3.76923 7.61303 3.76923H7.96085C8.0531 3.76923 8.14157 3.80975 8.2068 3.88188C8.27203 3.95401 8.30868 4.05184 8.30868 4.15385V5.69231C8.30868 5.94485 8.26369 6.19492 8.17629 6.42824C8.08889 6.66156 7.96079 6.87355 7.7993 7.05213C7.6378 7.2307 7.44608 7.37236 7.23508 7.469C7.02408 7.56564 6.79793 7.61538 6.56955 7.61538ZM10.7435 9.15385C10.559 9.15385 10.382 9.0728 10.2516 8.92854C10.1211 8.78429 10.0478 8.58863 10.0478 8.38462C10.0478 8.1806 10.1211 7.98495 10.2516 7.84069C10.382 7.69643 10.559 7.61538 10.7435 7.61538C10.928 7.61538 11.1049 7.69643 11.2354 7.84069C11.3658 7.98495 11.4391 8.1806 11.4391 8.38462C11.4391 8.58863 11.3658 8.78429 11.2354 8.92854C11.1049 9.0728 10.928 9.15385 10.7435 9.15385Z" fill="#C989DD"/>
                      </svg>
                  )
              }
              {   rdv.modeConsultation.mode==="VIDEO" && (
                  <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="0.134766" width="16" height="16" rx="8" fill="#FCB769" fill-opacity="0.2"/>
                      <path d="M10.9186 9.23682L10.6883 9.5639L10.6883 9.56391L10.9186 9.23682ZM12.8571 10.6013L12.6269 10.9284C12.6481 10.9434 12.6708 10.9563 12.6946 10.9669L12.8571 10.6013ZM13.3844 10.2587L13.7844 10.2587V10.2587H13.3844ZM13.3844 5.74088H13.7844V5.74088L13.3844 5.74088ZM12.8571 5.39823L12.6946 5.03272C12.6708 5.04329 12.6481 5.05616 12.6269 5.07113L12.8571 5.39823ZM10.9186 6.76276L10.6883 6.43566L10.6883 6.43567L10.9186 6.76276ZM10.7594 7.06932L10.3594 7.06923V7.06932H10.7594ZM10.7594 8.93026H10.3594V8.93034L10.7594 8.93026ZM8.41602 11V11.4L8.41717 11.4L8.41602 11ZM4.10352 11L4.10237 11.4H4.10352V11ZM2.88477 9.78125H2.48476L2.48477 9.7824L2.88477 9.78125ZM2.88477 6.21875L2.48477 6.2176V6.21875H2.88477ZM4.10352 5V4.6L4.10237 4.6L4.10352 5ZM8.42727 5L8.4285 4.6H8.42727V5ZM9.63477 6.2075H10.0348L10.0348 6.20626L9.63477 6.2075ZM9.63477 9.78125L10.0348 9.7824V9.78125H9.63477ZM10.6883 9.56391L12.6269 10.9284L13.0873 10.2743L11.1488 8.90973L10.6883 9.56391ZM12.6946 10.9669C12.8126 11.0193 12.9418 11.0415 13.0706 11.0313L13.0075 10.2338C13.0116 10.2334 13.0158 10.2342 13.0196 10.2358L12.6946 10.9669ZM13.0706 11.0313C13.1993 11.0211 13.3234 10.9789 13.4317 10.9085L12.9958 10.2377C12.9993 10.2355 13.0033 10.2341 13.0075 10.2338L13.0706 11.0313ZM13.4317 10.9085C13.54 10.8382 13.629 10.7419 13.6906 10.6284L12.9875 10.2468C12.9895 10.2431 12.9923 10.24 12.9958 10.2377L13.4317 10.9085ZM13.6906 10.6284C13.7522 10.5149 13.7844 10.3878 13.7844 10.2587L12.9844 10.2587C12.9844 10.2545 12.9855 10.2504 12.9875 10.2468L13.6906 10.6284ZM13.7844 10.2587V5.74088H12.9844V10.2587H13.7844ZM13.7844 5.74088C13.7844 5.61174 13.7522 5.48466 13.6906 5.37117L12.9875 5.75281C12.9855 5.74915 12.9844 5.74505 12.9844 5.74089L13.7844 5.74088ZM13.6906 5.37117C13.629 5.25768 13.54 5.16138 13.4317 5.09103L12.9958 5.76185C12.9923 5.75958 12.9895 5.75647 12.9875 5.75281L13.6906 5.37117ZM13.4317 5.09103C13.3234 5.02067 13.1993 4.97848 13.0706 4.9683L13.0075 5.76581C13.0033 5.76548 12.9993 5.76412 12.9958 5.76185L13.4317 5.09103ZM13.0706 4.9683C12.9418 4.95812 12.8126 4.98026 12.6946 5.03272L13.0196 5.76373C13.0158 5.76542 13.0116 5.76614 13.0075 5.76581L13.0706 4.9683ZM12.6269 5.07113L10.6883 6.43566L11.1488 7.08985L13.0873 5.72532L12.6269 5.07113ZM10.6883 6.43567C10.5867 6.50718 10.5038 6.60207 10.4466 6.71233L11.1566 7.08092C11.1548 7.08447 11.1521 7.08754 11.1488 7.08984L10.6883 6.43567ZM10.4466 6.71233C10.3894 6.82259 10.3595 6.945 10.3594 7.06923L11.1594 7.0694C11.1594 7.07341 11.1585 7.07736 11.1566 7.08092L10.4466 6.71233ZM10.3594 7.06932V8.93026H11.1594V7.06932H10.3594ZM10.3594 8.93034C10.3595 9.05458 10.3894 9.17698 10.4466 9.28724L11.1566 8.91866C11.1585 8.92221 11.1594 8.92616 11.1594 8.93017L10.3594 8.93034ZM10.4466 9.28724C10.5038 9.39751 10.5867 9.49239 10.6883 9.5639L11.1488 8.90973C11.1521 8.91204 11.1548 8.9151 11.1566 8.91866L10.4466 9.28724ZM8.41602 10.6H4.10352V11.4H8.41602V10.6ZM4.10466 10.6C3.88741 10.5994 3.67922 10.5128 3.5256 10.3592L2.95991 10.9249C3.263 11.2279 3.67373 11.3988 4.10237 11.4L4.10466 10.6ZM3.5256 10.3592C3.37197 10.2055 3.28539 9.99736 3.28476 9.7801L2.48477 9.7824C2.486 10.211 2.65682 10.6218 2.95991 10.9249L3.5256 10.3592ZM3.28477 9.78125V6.21875H2.48477V9.78125H3.28477ZM3.28476 6.2199C3.28539 6.00264 3.37197 5.79446 3.5256 5.64083L2.95991 5.07515C2.65682 5.37824 2.486 5.78897 2.48477 6.2176L3.28476 6.2199ZM3.5256 5.64083C3.67922 5.4872 3.88741 5.40062 4.10466 5.4L4.10237 4.6C3.67373 4.60123 3.263 4.77205 2.95991 5.07515L3.5256 5.64083ZM4.10352 5.4H8.42727V4.6H4.10352V5.4ZM8.42603 5.4C8.64032 5.40066 8.84564 5.48608 8.99716 5.6376L9.56285 5.07192C9.2619 4.77097 8.85411 4.60132 8.4285 4.6L8.42603 5.4ZM8.99716 5.6376C9.14869 5.78913 9.23411 5.99445 9.23477 6.20874L10.0348 6.20626C10.0334 5.78066 9.8638 5.37287 9.56285 5.07192L8.99716 5.6376ZM9.23477 6.2075V9.78125H10.0348V6.2075H9.23477ZM9.23477 9.7801C9.23414 9.99736 9.14756 10.2055 8.99394 10.3592L9.55962 10.9249C9.86271 10.6218 10.0335 10.211 10.0348 9.7824L9.23477 9.7801ZM8.99394 10.3592C8.84031 10.5128 8.63213 10.5994 8.41487 10.6L8.41717 11.4C8.8458 11.3988 9.25653 11.2279 9.55962 10.9249L8.99394 10.3592Z" fill="#FCB769"/>
                  </svg>
              )}
              {   rdv.modeConsultation.mode==="DOMICILE" && (
                  <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="0.134766" y="0.5" width="16" height="16" rx="8" fill="#6DC0F9" fill-opacity="0.18"/>
                      <path d="M4.00949 8.56987V12.9996C4.00949 13.099 4.049 13.1944 4.11933 13.2647C4.18966 13.3351 4.28504 13.3746 4.38449 13.3746H6.63449V10.1871C6.63449 10.0379 6.69376 9.89482 6.79925 9.78933C6.90474 9.68384 7.04781 9.62458 7.19699 9.62458H9.07199C9.22118 9.62458 9.36425 9.68384 9.46974 9.78933C9.57523 9.89482 9.63449 10.0379 9.63449 10.1871V13.3746H11.8845C11.984 13.3746 12.0793 13.3351 12.1497 13.2647C12.22 13.1944 12.2595 13.099 12.2595 12.9996V8.56987M11.5098 6.6949V3.99959H10.3848V5.61678M13.3848 8.49959L8.39 3.71834C8.27281 3.59459 7.99883 3.59318 7.87953 3.71834L2.88477 8.49959H13.3848Z" stroke="#6DC0F9" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
              )}
          </div>

      </>
  );
}

export default RdvItemAgenda;
