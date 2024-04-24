import React, { useEffect, useRef, useState } from 'react'
import { useForm } from "react-hook-form";
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import Model, { ModelBody, ModelFooter, ModelHeader } from '../../components/Models/Model'
import "./monCompte.scss";
import CompteServices from './Services/CompteServices';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import Mark from 'mark.js';


const MonCompte = () => {
    const [focused, setFocused] = useState(false);
    const [showModelPartage, setShowModelPartage] = useState(false);
    const [showModelPassword, setShowModelPassword] = useState(false);
    const [showPasswordchanged, setShowPasswordchanged] = useState(false);
    const [showAddProche, setShowAddProche] = useState(false);
    const [showAutorisation, setShowAutorisation] = useState(false);
    const [showModifierMInfo, setShowModifierMInfo] = useState(false);
    const [showModifierPInfo, setShowModifierPInfo] = useState(false);
    const [showSupprimerCompte, setShowSupprimerCompte] = useState(false);
    const [showCondition, setShowCondition] = useState(false);
    const [showCodeEmail, setShowCodeEmail] = useState(false);
    const [showSupprimerProche, setShowSupprimerProche] = useState(false)
    const [selectedMedecinIndex, setSelectedMedecinIndex] = useState(-1);
    const [filter, setFilter] = useState(true);
    const [eyeOn, seteyeOn] = useState(true)
    const [eyeOff, seteyeOff] = useState(true);
    const [eyepassOff, seteyepassOff] = useState(true)
    const [eyepassOn, seteyepassOn] = useState(true)
    const [data, setData] = useState([]);
    const [adresse_pat, setAdresse_pat] = useState();
    const [codePost_pat, setCodePost_pat] = useState();
    const [dateNaissance, setDateNaissance] = useState();
    const [emailPat, setEmailPat] = useState();
    const [matricule_pat, setMatricule_pat] = useState();
    const [mutuelNumber, setMutuelNumber] = useState();
    const [nom_pat, setNom_pat] = useState();
    const [placeOfBirth, setPlaceOfBirth] = useState();
    const [prenom_pat, setPrenom_pat] = useState();
    const [telephone, setTelephone] = useState();
    const [civilite_pat, setCivilite_pat] = useState();
    const [allProche, setAllProche] = useState([]);
    const [ActiveMoi, setActiveMoi] = useState(false)
    const [ActiveProche, setActiveProche] = useState(false)
    const [updateProche, setUpdateProche] = useState()
    const [Loading, setLoading] = useState(false);
    const [account, setAccount] = useState({})
    const [medecins, setMedecins] = useState([]);
    const [emailConfirmation, setEmailConfirmation] = useState('');
    const [confirmation, setConfirmation] = useState('');
    const [cd1, setCd1] = useState(false);
    const [cd2, setCd2] = useState(false);
    const [cd3, setCd3] = useState(false);
    const [cd4, setCd4] = useState(false);
    const [patient, setPatient] = useState({
        adresse_pat: "",
        civilite_pat: "Mr",
        codePost_pat: "",
        dateNaissance: "",
        patientEmail: "",
        matricule_pat: "",
        mutuelNumber: "",
        nom_pat: "",
        patient_type: "PROCHE",
        placeOfBirth: "",
        prenom_pat: "",
        patientTelephone: "",
        villeId: ""
    })
    const [newpatient, setNewpatient] = useState({
        adresse_pat: "",
        civilite_pat: "",
        codePost_pat: "",
        dateNaissance: "",
        patientEmail: "",
        matricule_pat: "",
        mutuelNumber: "",
        nom_pat: "",
        patient_type: "",
        placeOfBirth: "",
        prenom_pat: "",
        patientTelephone: "",
        villeId: ""
    })

    const { id, type, token, email } = JSON.parse(localStorage.getItem("user"));
    const { villes, specialite } = useSelector((state) => state.global)
    const [idProche, setIdProche] = useState(id)
    // const config = {
    //     headers: { Authorization: `${type} ${token}` }
    // };
    const { register, handleSubmit, watch, formState: { errors } } = useForm({ mode: 'onSubmit' });

    const onSubmit = async (data) => {
        
        const pass = `${data.password}`
       
        try {
            setLoading(true);
            CompteServices.ResetPassword({
                "email": email,
                "password": pass
            })
                .then((Response) => {
                    if (Response.status === 200) {
                        setShowModelPassword(false)
                        setShowPasswordchanged(true)
                    }
                }).catch((error) => {
                    console.log(error)
                    toast.error(error.message)
                }).finally(() => {
                    setLoading(false);
                })
        } catch (error) {
            toast.error(error.message)
        }
    }
    const CheckPassword = async (data) => {
        const pass = `${data.password}`;
        try {
            setLoading(true);
           CompteServices.CheckPassword(pass)// Utilisez CheckPassword pour vérifier le mot de passe
           .then((Response) => {
            if (Response.data.success) {
                console.log(pass)
                condition();   
            } else {
                toast.error("Le mot de passe ne correspond pas. Veuillez réessayer.");
            }
        }).catch((error) => {
            console.error("Une erreur s'est produite lors de la vérification du mot de passe :", error);
            toast.error("Une erreur s'est produite. Veuillez réessayer.");
        }).finally(() => {
            setLoading(false);
        })
        } catch (error) {
            toast.error(error.message)
        }
    }
    const UpdateinfoPateint = (e) => {

        try {
            e.preventDefault();
            console.log(account)
            setLoading(true);
            CompteServices.UpdatePatient(account.id,JSON.stringify(account))
            .then((response)=>{
                if (response.status === 200) {
                console.log("res",response)
                toast.success("Vos informations sont bien modifier")
                setAccount(response.data)
                }
            }).catch((error)=>{
                toast.error(error.message)
                setLoading(false)
            }).finally(()=>{
                setLoading(false);
            })
            
        } catch (error) {
            toast.error(error.message)
        }

    }
    const deleteProche = () => {
        try {
            setLoading(true)
            CompteServices.deleteProche(idProche)
                .then((response) => {
                    if (response.status === 200) {
                        toast.success("suppression avec secces")
                        setShowSupprimerProche(false)
                        getAllProcheOfCurrentUser();
                    }

                }).catch((error) => {
                    toast.error(error.message)
                    setLoading(false)
                }).finally(() => {
                    setLoading(false)
                })
        } catch (error) {
            console.log(error);
        }
    }
    const handleSendConfirmationCode = () => {
        if (email !== emailConfirmation) {
            toast.error("Email saisi ne correspond pas à votre adresse email.");
            return;
        }
        try {
            setLoading(true);
            CompteServices.SendConfirmationCode(email)
            .then((response) => {
                if (response.status === 200) {
                    console.log(response.data);
                    toast.success("Code de confirmation envoyé avec succès.")
                }
            })
            .catch((error) => {
                toast.error(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    } catch (error) {
        console.log(error);
    }
};

    const supprimerCompte = () => {
        try {
            setLoading(true)
            CompteServices.SupprimerCompte(confirmation)
                .then((response) => {
                    if (response.status === 200) {
                        logOut(); // Appel de la fonction pour déconnecter l'utilisateur
                        toast.success("Vous avez supprimé votre compte avec succès.");
                    }

                }).catch((error) => {
                    toast.error("Code de confirmation invalide");
                }).finally(() => {
                    setLoading(false)
                })
        } catch (error) {
            console.log(error);
        }
    }

    const addProche = async () => {
    console.log("patient:",patient)
        try {
            const DataPatient = JSON.stringify(patient); 
            CompteServices.addProche(DataPatient)
                .then((response) => {
                    if (response.status === 200) {
                        toast.success("un proche a été ajouté avec succes")
                        setShowAutorisation(false) 
                        getAllProcheOfCurrentUser();
                    }
                }).catch((error) => {
                    toast.error(error.message)
                    setLoading(false)
                }).finally(() => {
                    setLoading(false)
                })

        } catch (error) {
            toast.error(error.message);
        }
    }

    const modifierProche = async () => {
        console.log("pat :",patient)
        try {
            CompteServices.modifierProche(idProche, patient)
                .then((res) => {
                    if (res.status === 200) {
                        toast.success("les données change avec succes")
                    }
                }).catch((error) => {
                    toast.error(error.message)
                    setLoading(false)
                }).finally(() => {
                    setLoading(false)
                })
        } catch (error) {
            toast.error(error.message);
        }

    }
    const modifierAnathorProche = async () => {
        console.log("pat :",patient)
    try {
        const stringifiedData = JSON.stringify(patient); // Convert patientData to JSON string
        CompteServices.modifierProche(idProche, stringifiedData)
            .then((res) => {
                if (res.status === 200) {
                    toast.success("les données change avec succes")
                    setShowModifierPInfo(false)
                    getAllProcheOfCurrentUser();
                }
            }).catch((error) => {
                toast.error(error.message)
                setLoading(false)
            }).finally(() => {
                setLoading(false)
            })
    } catch (error) {
        toast.error(error.message)
    }

}

    const fetchMedecins = async () => {
        try {
        CompteServices.MedcinsRendezVous(idProche)
        .then((res) => {
            if (res.status === 200) {
                setMedecins(res.data);
                console.log("med:",res.data)
            }
        }).catch((error) => {
            toast.error(error.message)
            setLoading(false)
        }).finally(() => {
            setLoading(false)
        })
        } catch (error) {
            toast.error(error.message)
        }
     }

    const handleRadioChange = (index) => {
        setSelectedMedecinIndex(index);
    };
    const getAllProcheOfCurrentUser = async () => {

        try {

            CompteServices.getProchesOfCurrentUser()
                .then((res) => {
                    if (res.status === 200) {
                        setAllProche(res.data)
                    }
                }).catch((error) => {
                    toast.error(error.message)
                    setLoading(false)
                }).finally(() => {
                    setLoading(false)
                })
        } catch (error) {
            toast.error(error.message)
        }
    }
    const logOut = () => {
        localStorage.removeItem("user");
        window.location = "/login";
        // window.location.reload();
      };
    const clickFilter = () => {
        setFilter(!filter)
    }
    const togglePassw = (e) => {
        const input = e.target.parentElement.querySelector("input");
        input.type === "password"
            ? (input.type = "text")
            : (input.type = "password");
    };
    const [res, setRes] = useState()

    const condition = () => {
        setShowSupprimerCompte(false)
        setShowCondition(true)
    }

    const codeEmail = () => {
        setShowCondition(false);
        setShowCodeEmail(true);
    }

    const autorisationSupprimerProche = () => {

    }
    const clickProche = () => {
        setActiveProche(!ActiveProche)
        setActiveMoi(false)

    }
    const clickMoi = () => {
        setActiveMoi(!ActiveMoi)
        setActiveProche(false)
    }
    const GetPatient = (id) => {
        try {
            setLoading(true);
            CompteServices.getPatientById(id)
                .then((res) => {
                    if (res.status === 200) {
                        setNewpatient(res.data)
                        
                    }
                }).catch((error) => {
                    toast.error(error.message);
                    setLoading(false)
                }).finally(() => {
                    setLoading(false)
                });

        } catch (error) {
            toast.error(error.message)
        }
    }
    const getMainPatient = () => {
        try {
            setLoading(true);
            CompteServices.getMainPatient()
                .then((res) => {
                    if (res.status === 200) {
                        setAccount(res?.data)
                    }
                }).catch((error) => {
                    toast.error(error.message);
                }).finally(() => {
                    setLoading(false)
                });

        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        GetPatient(id)
        getAllProcheOfCurrentUser();
        getMainPatient();
     
    }, [id]);
    useEffect(() => {
        fetchMedecins();
    }, [idProche]);


    const calculateAge=(birthDate)=> {
        const currentDate = new Date();
        const dob = new Date(birthDate);
        
        let age = currentDate.getFullYear() - dob.getFullYear();
        const monthDiff = currentDate.getMonth() - dob.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < dob.getDate())) {
          age--;
        }
        
        return age;
      }

      const formatDate = (dateString) => {
        if (!dateString) {
            return ''; // ou une valeur par défaut appropriée
        }
        const dateComponents = dateString.split('T')[0].split('-');
        const year = dateComponents[0];
        const month = dateComponents[1];
        const day = dateComponents[2];
        
        return `${year}/${month}/${day}`;
      }

    const ActiveBtn = (e) => {
        const allElements = [...document.querySelectorAll(".filtre .moiproche")];
        allElements.forEach((element) => element.classList.remove("activeBtn"));
        e.target.classList.add("activeBtn");
    };

    const handelFocused = (e) => {
        setFocused(true)
    }
    // Toggle search
    const [search, setSearch] = useState({
        city: "",
        spec: "",
    });
    const toggleSeach = (e) => {
        const { name, value } = e.target;
        setSearch((x) => {
            return { ...x, [name]: value };
        });
    };
    const toggleSeachOnClick = (name, libelle) => {
        setSearch((y) => {
            return { ...y, [name]: libelle, villeName: '' };
        });
    };
    // Filter citys
    const filterSearch = (array, search, param) => {
        const x = array && array.toLowerCase();
        const newArray = search?.filter((item) =>
            item[param]
                ?.toLowerCase()
                .normalize("NFD")
                .replace(/\p{Diacritic}/gu, "")
                .includes(x)
        );
        const y = !array ? [] : newArray;
        return y;
    };
    // Mark citys

    const handleSeach = (array, container) => {
        const context = container.current;
        const instance = new Mark(context);
        if (array && villes) instance.unmark(array);
        if (array && villes && !Loading) instance.mark(array);
    };
    const citySearchContainer = useRef();
    const specSearchContainer = useRef();
    useEffect(() => {
        handleSeach(search.city, citySearchContainer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search, villes]);
    const password = watch('password')
    return (<>
        <Navbar />
        <div className='container-moncompte'>
            <div className="moncompte">
                <h1>Mon compte</h1>
                <form action="" onSubmit={UpdateinfoPateint}>
                    <div>
                        <label htmlFor="">Adresse e-mail</label>
                        <input type="email" placeholder='demos@clinital.io' defaultValue={email || ""} />
                        <img className='done-email' src="/icons/done.svg" alt="" />
                        <br />
                        <label htmlFor="">Numéro de téléphone </label>

                        <input type="text" placeholder='+212 5 00 00 00 00' value={account.patientTelephone || ""}
                            onChange={(e) => setAccount((prevAccount) => ({
                                ...prevAccount, // Keep all existing properties
                                patientTelephone: e.target.value // Update the desired property
                            }))} />
                        <img className='done-tel' src="/icons/done.svg" alt="" />
                        <button type='submit' disabled={Loading}>{!Loading?"Enregistrer":"Loading..."}</button>
                        <a href="#" onClick={() => setShowModelPassword(true)}>Modifier votre Mot De Passe</a>
                    </div>
                </form>
                <Model
                    show={showModelPassword}
                    setShow={setShowModelPassword}
                >
                    <div className="modifierPassword">
                        <ModelHeader className="model-header">

                            <h3>Modifier votre mot de passe</h3>
                            <img className='close-black' src="/icons/black-close.svg" alt="" onClick={() => setShowModelPassword(false)} />
                        </ModelHeader>
                        <ModelBody className="model-body">
                            <form action="" onSubmit={handleSubmit(onSubmit)}>
                                <div>
                                    <label htmlFor="changepassword">Votre nouveau mot de passe
                                    </label>
                                    <input
                                        type={eyeOff ? "password" : "text"}
                                        name="changepassword"
                                        className={`${errors.password && "err-input"}`}
                                        placeholder="Saisir votre nouveau mot de passe"
                                        {...register("password", {
                                            required: 'Password is required',

                                        })}
                                    // onChange={(e) => setPassword(e.target.value)}
                                    />
                                    {errors.password && <span className='err'>{errors.password.message}</span>}
                                    {eyeOff ?
                                        <img src="../icons/eye-off.png" alt="" onClick={() => seteyeOff(false)} />
                                        :
                                        <img src="../icons/eye-on.svg" alt="" onClick={() => seteyeOff(true)} />

                                    }
                                </div>
                                <div>
                                    <label htmlFor="changepassword">Confirmation de mot de passe</label>
                                    <input
                                        type={eyeOn ? "password" : "text"}
                                        name="changepassword"
                                        placeholder="Confirmez votre nouveau mot de passe"
                                        className={`${errors.confirmpassword && "err-input"}`}
                                        {...register("confirmpassword", {
                                            required: 'Confirm password is required',
                                            validate: (value) =>
                                                value === password || "the passwords do not match",
                                        })}
                                        onPaste={(e) => {
                                            e.preventDefault()
                                            return false;
                                        }}
                                    />
                                    {errors.confirmpassword && <span className='err'>{errors.confirmpassword.message}</span>}
                                    {eyeOn ?
                                        <img src="../icons/eye-off.png" alt="" onClick={() => seteyeOn(false)} />
                                        :
                                        <img src="../icons/eye-on.svg" alt="" onClick={() => seteyeOn(true)} />

                                    }                                </div>
                                <div>
                                    <p>Votre mot de passe vous permettra d’accéder à votre compte et gérer vos rendez-vous médicaux.</p>
                                </div>
                                <button className='btn-Model' id='hoverbtn'
                                // onClick={updatePassword}
                                >Modifier <img id="icon" src="/icons/flech-white.svg" alt="" /></button>
                            </form>
                        </ModelBody>
                        <ModelFooter>

                        </ModelFooter>
                    </div>
                </Model>

                <Model
                    show={showPasswordchanged}
                    setShow={setShowPasswordchanged}
                >
                    <div className="modifierPassword">
                        <ModelHeader className="model-header">
                            <h3>Votre mot de passe a été modifié avec succès</h3>
                            <img className='close-black' src="/icons/black-close.svg" alt="" onClick={() => setShowPasswordchanged(false)} />
                        </ModelHeader>
                        <ModelBody className="model-body">
                            <div className="icon-secces">
                                <img id="icon-secces" src="../icons/check.svg" alt="" />
                            </div>
                        </ModelBody>
                    </div>
                </Model>
            </div>
            <div className="mesInfo">
                <div className="head">
                    <div>
                        <h1>Mes informations et Mes Proches</h1>
                        {filter ? (
                            <button onClick={clickFilter} className="filtre"><img src="/icons/filter.svg" alt="" /> Filter</button>
                        ) : (
                            <div className="filtre"><img src="/icons/minivector.svg" alt="" onClick={clickFilter} />
                                {ActiveMoi ?
                                    <button className='btnMoi ' onClick={clickMoi}>Moi</button>
                                    :
                                    <button className='btnMoi  activeBtn' onClick={clickMoi}>Moi</button>
                                }
                                {ActiveProche ?
                                    <button className='btnProche  ' onClick={clickProche}>Proche</button> :
                                    <button className='btnProche activeBtn' onClick={clickProche}>Proche</button>
                                }

                                <img src="/icons/next-Vector.svg" alt="" /></div>
                        )}
                    </div>
                    <div>
                        <img src="/icons/add.svg" alt="" />
                        <button className='addProche' onClick={() => setShowAddProche(true)}>Ajouter un Proche</button>
                    </div>
                    <Model
                        show={showAddProche}
                        setShow={setShowAddProche}
                    >
                        <div className="container-addProche">
                            <ModelHeader className="model-header">
                                <h3>Ajouter un Proche</h3>
                                <img className='close-black' src="/icons/black-close.svg" alt="" onClick={() => setShowAddProche(false)} />
                            </ModelHeader>
                            <ModelBody className="model-body">

                                <div>
                                    <form action="" >
                                        <div>
                                            <label htmlFor="">Civilité</label>
                                            <div className='addForm'>
                                                <label htmlFor="dam" className="input-check-box1">
                                                    <input
                                                        required
                                                        type="radio"
                                                        name="Civilité"
                                                        id="dam"
                                                        onClick={() => { setPatient({ ...patient, civilite_pat: "Mme" }); setCivilite_pat("Mme") }}
                                                    />
                                                    <div className="input-doth"></div>
                                                    <span>Madame</span>
                                                </label>
                                                <label htmlFor="Mr" className="input-check-box">
                                                    <input
                                                        required
                                                        type="radio"
                                                        name="Civilité"
                                                        id="Mr"
                                                        onClick={() => { setPatient({ ...patient, civilite_pat: "Mr" }); setCivilite_pat("Mr") }}
                                                    />
                                                    <div className="input-doth"></div>
                                                    <span>Monsieur</span>
                                                </label>
                                            </div>
                                        </div>
                                        <div className='content'>
                                            <div>
                                                <label htmlFor="">Prénom
                                                </label>
                                                <input
                                                    type="text"
                                                    name=""
                                                    placeholder="Saisir le prénom de votre Proche"
                                                    required
                                                    onChange={(e) => { setPatient({ ...patient, prenom_pat: e.target.value }); setPrenom_pat(e.target.value) }}

                                                    focused={focused.toString()}
                                                />
                                                <span className='err'>Prenom est obligatoire</span>
                                            </div>
                                            <div>
                                                <label htmlFor="">Nom
                                                </label>
                                                <input
                                                    type="text"
                                                    name=""
                                                    placeholder="Saisir le nom de votre Proche"
                                                    required
                                                    onChange={(e) => { setPatient({ ...patient, nom_pat: e.target.value }); setNom_pat(e.target.value) }}
                                                    focused={focused.toString()}
                                                />
                                                <span className='err'>Le nom est obligatoire</span>
                                            </div>
                                            <div>
                                                <label htmlFor="">Date de naissance
                                                </label>
                                                <input
                                                    type="text"
                                                    name=""
                                                    placeholder="Saisir la date de naissance de votre Proche "
                                                    required
                                                    onChange={(e) => { setPatient({ ...patient, dateNaissance: e.target.value }); setDateNaissance(e.target.value) }}
                                                    focused={focused.toString()}
                                                />
                                                <span className='err'>la date de naissance est obligatoire</span>
                                               
                                            </div>
                                            <div>
                                                <label htmlFor="">Lieu de naissance
                                                </label>
                                                <input
                                                    type="text"
                                                    name=""
                                                    placeholder="Saisir lieu de naissance de votre Proche"
                                                    required
                                                    onChange={(e) => { setPatient({ ...patient, placeOfBirth: e.target.value }); setPlaceOfBirth(e.target.value) }}
                                                    focused={focused.toString()}
                                                />
                                                <span className='err'>le lieu de naissance est obligatoire</span>
                                            </div>
                                            <div>
                                                <label htmlFor="">Adresse e-mail
                                                </label>
                                                <input
                                                    type="text"
                                                    name=""
                                                    placeholder="Saisir une adresse e-mail"
                                                    required
                                                    onChange={(e) => { setPatient({ ...patient, patientEmail: e.target.value }); setEmailPat(e.target.value) }}
                                                    focused={focused.toString()}
                                                />
                                                <span className='err'>L'email est obligatoire</span>
                                            </div>
                                            <div>
                                                <label htmlFor="">Téléphone
                                                </label>
                                                <input
                                                    type="text"
                                                    name=""
                                                    placeholder="Saisir un numéro de téléphone"
                                                    required
                                                    onChange={(e) => { setPatient({ ...patient, patientTelephone: e.target.value }); setTelephone(e.target.value) }}
                                                    focused={focused.toString()}
                                                />
                                                <span className='err'>Le telephone est obligatoire</span>
                                            </div>
                                            <div>
                                                <label htmlFor="">N° de Mutuelle / CNSS / CNOP
                                                </label>
                                                <input
                                                    type="text"
                                                    name=""
                                                    placeholder="N° de Mutuelle / CNSS / CNOP"
                                                    // required
                                                    onChange={(e) => { setPatient({ ...patient, mutuelNumber: e.target.value }); setMutuelNumber(e.target.value) }}
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="">Matricule

                                                </label>
                                                <input
                                                    type="text"
                                                    name=""
                                                    placeholder="N° de patient"
                                                    disabled
                                                    onChange={(e) => { setPatient({ ...patient, matricule_pat: e.target.value }); setMatricule_pat(e.target.value) }}
                                                />

                                            </div>
                                        </div>
                                        <div className='adresse'>
                                            <label htmlFor="">Adresse

                                            </label>
                                            <input
                                                type="text"
                                                name=""
                                                placeholder="Saisir une adresse postale"
                                                // required
                                                onChange={(e) => { setPatient({ ...patient, adresse_pat: e.target.value }); setAdresse_pat(e.target.value) }}
                                            />
                                        </div>
                                        <div className='content'>
                                            <div>
                                                
                                                <input
                                                    type="text"
                                                    name="city"
                                                    onChange={(e) => {
                                                        toggleSeach(e); 
                                                    }}
                                                    value={search.city}
                                                    placeholder="Saisir la ville"
                                                />
                                                <div className="result" ref={citySearchContainer}>
                                                    {Loading ? (
                                                        <span className="loading">Loading...</span>
                                                    ) : (
                                                        filterSearch(search.city, villes, "nom_ville")?.map(
                                                            (x, index) => (
                                                                <span
                                                                    key={index}
                                                                    onClick={() => {
                                                                        setPatient({ ...patient, villeId: x.id_ville });
                                                                        toggleSeachOnClick("city", x.nom_ville);
                                                                    }}>
                                                                    {x.nom_ville}
                                                                </span>
                                                            )
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                            <div>
                                                <input
                                                    type="text"
                                                    name=""
                                                    placeholder="Saisir le code postale"
                                                    // required
                                                    onChange={(e) => { setPatient({ ...patient, codePost_pat: e.target.value }); setCodePost_pat(e.target.value) }}
                                                />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </ModelBody>
                            <ModelFooter>
                                <button className='btn-Model'

                                    onFocus={handelFocused}
                                    onClick={() => {setShowAddProche(false);
                                                   setShowAutorisation(true);}}            
                                >Enregistrer </button>
                            </ModelFooter>
                        </div>
                    </Model>
                    <Model
                        show={showAutorisation}
                        setShow={setShowAutorisation}
                    > <div className="autorisation">
                            <ModelHeader className="model-header">

                                <h3>Autorisation de mon Proche</h3>
                                {/* <img className='close-black' src="/icons/black-close.svg" alt="" onClick={() => setShowAutorisation(false)} /> */}
                            </ModelHeader>
                            <ModelBody className="model-body">
                                <div >
                                <p>J'affirme avoir obtenu l'autorisation de mon Proche pour administrer son dossier médical en son nom. Je prends cette responsabilité au sérieux et m'engage à agir dans son meilleur intérêt, tout en adhérant aux règles et aux politiques en vigueur concernant la gestion des dossiers médicaux.<br/>
                                 Je reconnais pleinement l'importance de préserver la confidentialité des informations médicales de mon Proche. Je m'engage à ne pas partager ces données avec des tiers sans l'accord préalable de mon proche ou en l'absence d'une obligation légale.</p>
                                 </div>
                            </ModelBody>
                            <ModelFooter>
                                <div className="autorisation-footer">
                                    <button className='btn-Model' onClick={() => setShowAutorisation(false)}>Annuler </button>
                                    <button className='btn-Model'  onClick={addProche}>Confirmer</button></div>
                            </ModelFooter>
                        </div>
                    </Model>
                </div>
                {!ActiveMoi & !ActiveProche ? (
                    <div className="container-card-info">
                        {
                            <div className="body">
                                <div>
                                    <h3>{account.civilite_pat}  {account.nom_pat} {account.prenom_pat} </h3>
                                    <div className='info-body'>
                                        <p>{formatDate(account.dateNaissance)} - {calculateAge(account.dateNaissance)}ans</p>
                                        <p>{account.adresse_pat}, {account.codePost_pat}</p>
                                    </div>
                                    <button id="btn-moi" >Moi</button>
                                </div>
                                <div>
                                    <button onClick={() =>{setShowModelPartage(true);
                                        setIdProche(account.id)}}> <img src="/icons/share.svg" alt="" /> Partager Dossier </button>
                                    <span style={{ cursor: 'pointer' }} onClick={() => setShowModifierMInfo(true)}> <img src="/icons/update-icon.svg" alt="" /></span>
                                </div>
                            </div>
                        }
                        <Model
                            show={showModifierMInfo}
                            setShow={setShowModifierMInfo}
                        >
                            <div className="container-addProche">
                                <ModelHeader className="model-header">
                                    <h3>Modifier mes informations</h3>
                                    <img className='close-black' src="/icons/black-close.svg" alt="" onClick={() => setShowModifierMInfo(false)} />
                                </ModelHeader>
                                <ModelBody className="model-body">
                                    <div>
                                        <form action="">
                                            <div>
                                                <label htmlFor="">Civilité</label>
                                                <div className='addForm'>
                                                    <label htmlFor="madame" className="input-check-box1">
                                                        <input
                                                            required
                                                            type="radio"
                                                            name="Civilité"
                                                            id="madame"
                                                        />
                                                        <div className="input-doth"></div>
                                                        <span>Madame</span>
                                                    </label>
                                                    <label htmlFor="monsieur" className="input-check-box">
                                                        <input
                                                            required
                                                            type="radio"
                                                            name="Civilité"
                                                            id="monsieur"
                                                        />
                                                        <div className="input-doth"></div>
                                                        <span>Monsieur</span>
                                                    </label>
                                                </div>
                                            </div>
                                            <div className='content'>
                                                <div>
                                                    <label htmlFor="">Prénom
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name=""
                                                        placeholder="Saisir votre Prénom"
                                                        required
                                                        onChange={(e) => setPrenom_pat(e.target.value)}
                                                        defaultValue={data.prenom_pat}
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor="">Nom
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name=""
                                                        placeholder="Nom"
                                                        required
                                                        onChange={(e) => setNom_pat(e.target.value)}
                                                        defaultValue={data.nom_pat}
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor="">Date de naissance
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name=""
                                                        placeholder="Date de naissance"
                                                        required
                                                        onChange={(e) => setDateNaissance(e.target.value)}
                                                        defaultValue={data.dateNaissance}
                                                    />
                                                    <span id='age'>07ans</span>
                                                </div>
                                                <div>
                                                    <label htmlFor="">Lieu de naissance
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name=""
                                                        placeholder="Lieu de naissance"
                                                        required
                                                        onChange={(e) => setPlaceOfBirth(e.target.value)}
                                                        defaultValue={data.placeOfBirth}
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor="">Adresse e-mail
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name=""
                                                        placeholder="Adresse e-mail"
                                                        required
                                                        onChange={(e) => setEmailPat(e.target.value)}
                                                        defaultValue={data.patientEmail}
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor="">Téléphone
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name=""
                                                        placeholder="Téléphone"
                                                        required
                                                        onChange={(e) => setTelephone(e.target.value)}
                                                        defaultValue={data.patientTelephone}
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor="">N° de Mutuelle / CNSS / CNOP
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name=""
                                                        placeholder="N° de Mutuelle / CNSS / CNOP"
                                                        required
                                                        onChange={(e) => setMutuelNumber(e.target.value)}
                                                        defaultValue={data.mutuelNumber}
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor="">Matricule

                                                    </label>
                                                    <input
                                                        type="text"
                                                        name=""
                                                        placeholder="N° de patient"
                                                        required
                                                        onChange={(e) => setMatricule_pat(e.target.value)}
                                                        defaultValue={data.matricule_pat}
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                            <div className='adresse'>
                                                <label htmlFor="">Adresse

                                                </label>
                                                <input
                                                    type="text"
                                                    name=""
                                                    placeholder="Adresse"
                                                    required
                                                    onChange={(e) => setAdresse_pat(e.target.value)}
                                                    defaultValue={data.adresse_pat}
                                                />
                                            </div>
                                            <div className='content'>
                                                <div>
                                                    <input
                                                        type="text"
                                                        name=""
                                                        placeholder="Ville"
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <input
                                                        type="text"
                                                        name=""
                                                        placeholder="Code postal"
                                                        required
                                                        onChange={(e) => setCodePost_pat(e.target.value)}
                                                        defaultValue={data.codePost_pat}
                                                    />
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </ModelBody>
                                <ModelFooter>
                                    <button className='btn-Model' onClick={modifierProche}>Enregistre </button>
                                </ModelFooter>
                            </div>
                        </Model>
                        <Model
                            show={showModelPartage}
                            setShow={setShowModelPartage}
                        > <div className="partagewith">
                                <ModelHeader className="model-header">
                                    <h4>Partager Avec</h4>
                                    <img className='close-black' src="/icons/black-close.svg" alt="" onClick={() => setShowModelPartage(false)} />
                                </ModelHeader>
                                <ModelBody className="model-body">
                                    <div className="partage-avec">
                                    {medecins.map((medecin, index) => (
                                    <div key={index}>
                                             <label htmlFor={`medecin-${index}`}>
                                            Dr {medecin.nom_med} {medecin.prenom_med}
                                            <input
                                                id={`medecin-${index}`}
                                                type="radio"
                                                name="partageAvec"
                                                checked={selectedMedecinIndex === index}
                                                onChange={() => handleRadioChange(index)}
                                            />
                                            <div className="radio-button"></div>
                                        </label>
                                                
                                        </div>
                                    ))} 
                                    </div>
                                </ModelBody>
                                <ModelFooter>
                                    <button className='btn-Model' id="hoverbtn" onClick={() => setShowModelPartage(false)}>Envoyer <img id="icon" src="/icons/flech-white.svg" alt="" /></button>
                                </ModelFooter>
                            </div>
                        </Model>
                        {
                            allProche &&
                            allProche.map((proche) => (
                                <div className="body" key={proche.id} >

                                    <div>
                                        <h3>{proche.civilite_pat} {proche.nom_pat} {proche.prenom_pat} </h3>
                                        <div className='info-body'>
                                            <p>{proche.dateNaissance}- 32 ans</p>
                                            <p>{proche.adresse_pat}, {proche.codePost_pat} </p>
                                        </div>
                                        <button>Proche</button>
                                    </div>
                                    <div>
                                        <button onClick={() =>{setShowModelPartage(true);
                                        setIdProche(proche.id)}}> <img src="/icons/share.svg" alt="" /> Partager Dossier </button>
                                        <span style={{ cursor: 'pointer' }} onClick={() => {
                                            setShowModifierPInfo(true); setUpdateProche(proche);
                                            setCivilite_pat(proche.civilite_pat)
                                            setNom_pat(proche.nom_pat);
                                            setPlaceOfBirth(proche.placeOfBirth);
                                            setPrenom_pat(proche.prenom_pat)
                                            setTelephone(proche.patientTelephone)
                                            setAdresse_pat(proche.adresse_pat);
                                            setCodePost_pat(proche.codePost_pat);
                                            setDateNaissance(proche.dateNaissance);
                                            setEmailPat(proche.patientEmail);
                                            setMatricule_pat(proche.matricule_pat);
                                            setMutuelNumber(proche.mutuelNumber);
                                        }}> <img src="/icons/update-icon.svg" alt="" /></span>
                                    </div>
                                </div>
                            ))}

                        {showModifierPInfo &&
                            <Model
                                show={showModifierPInfo}
                                setShow={setShowModifierPInfo}
                            >
                                <div className="container-addProche atherProche">
                                    <ModelHeader className="model-header">
                                        <h3>Modifier les informations d’un proche</h3>
                                        <img className='close-black' src="/icons/black-close.svg" alt="" onClick={() => setShowModifierPInfo(false)} />
                                    </ModelHeader>
                                    <ModelBody className="model-body">
                                        <div>
                                            <form action="" onChange={() => setIdProche(updateProche.id)}>
                                                <div>
                                                    <label htmlFor="">Civilité</label>
                                                    <div className='addForm'>
                                                        <label htmlFor="dame" className="input-check-box1">
                                                            <input
                                                                required
                                                                type="radio"
                                                                name="Civilité"
                                                                id="dame"
                                                                onClick={() => { setPatient({ ...patient, civilite_pat: "Mme" }); setCivilite_pat("Mme") }}
                                                            />
                                                            <div className="input-doth"></div>
                                                            <span>Madame</span>
                                                        </label>
                                                        <label htmlFor="Mrs" className="input-check-box">
                                                            <input
                                                                required
                                                                type="radio"
                                                                name="Civilité"
                                                                onClick={() => { setPatient({ ...patient, civilite_pat: "Mr" }); setCivilite_pat("Mr") }}
                                                                id="Mrs"
                                                            />
                                                            <div className="input-doth"></div>
                                                            <span>Monsieur</span>
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className='content'>
                                                    <div>
                                                        <label htmlFor="">Prénom
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name=""
                                                            placeholder="Saisir votre Prénom"
                                                            required
                                                            defaultValue={updateProche.prenom_pat}
                                                            onChange={(e) => { setPatient({ ...patient, prenom_pat: e.target.value }); setPrenom_pat(e.target.value) }}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label htmlFor="">Nom
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name=""
                                                            placeholder="Nom"
                                                            required
                                                            defaultValue={updateProche.nom_pat}
                                                            onChange={(e) => { setPatient({ ...patient, nom_pat: e.target.value }); setNom_pat(e.target.value) }}

                                                        />
                                                    </div>
                                                    <div>
                                                        <label htmlFor="">Date de naissance
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name=""
                                                            placeholder="Date de naissance"
                                                            required
                                                            defaultValue={updateProche.dateNaissance}
                                                            onChange={(e) => { setPatient({ ...patient, dateNaissance: e.target.value }); setDateNaissance(e.target.value) }}                                                        />
                                                        <span id='age'>07ans</span>
                                                    </div>
                                                    <div>
                                                        <label htmlFor="">Lieu de naissance
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name=""
                                                            placeholder="Lieu de naissance"
                                                            required
                                                            defaultValue={updateProche.placeOfBirth}
                                                            onChange={(e) => { setPatient({ ...patient, placeOfBirth: e.target.value }); setPlaceOfBirth(e.target.value) }}                                                        />
                                                    </div>
                                                    <div>
                                                        <label htmlFor="">Adresse e-mail
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name=""
                                                            placeholder="Adresse e-mail"
                                                            required
                                                            defaultValue={updateProche.patientEmail}
                                                            onChange={(e) => { setPatient({ ...patient, patientEmail: e.target.value }); setEmailPat(e.target.value) }}                                                        />
                                                    </div>
                                                    <div>
                                                        <label htmlFor="">Téléphone
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name=""
                                                            placeholder="Téléphone"
                                                            required
                                                            defaultValue={updateProche.patientTelephone}
                                                            onChange={(e) => { setPatient({ ...patient, patientTelephone: e.target.value }); setTelephone(e.target.value) }}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label htmlFor="">N° de Mutuelle / CNSS / CNOP
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name=""
                                                            placeholder="N° de Mutuelle / CNSS / CNOP"
                                                            required
                                                            defaultValue={updateProche.mutuelNumber}
                                                            onChange={(e) => { setPatient({ ...patient, mutuelNumber: e.target.value }); setMutuelNumber(e.target.value) }}                                                        />
                                                    </div>
                                                    <div>
                                                        <label htmlFor="">Matricule

                                                        </label>
                                                        <input
                                                            type="text"
                                                            name=""
                                                            placeholder="N° de patient"
                                                            required
                                                            defaultValue={updateProche.matricule_pat}
                                                            onChange={(e) => { setPatient({ ...patient, matricule_pat: e.target.value }); setMatricule_pat(e.target.value) }}
                                                            disabled
                                                        />
                                                    </div>
                                                </div>
                                                <div className='adresse'>
                                                    <label htmlFor="">Adresse

                                                    </label>
                                                    <input
                                                        type="text"
                                                        name=""
                                                        placeholder="Adresse"
                                                        required
                                                        defaultValue={updateProche.adresse_pat}
                                                        onChange={(e) => { setPatient({ ...patient, adresse_pat: e.target.value }); setAdresse_pat(e.target.value) }}
                                                    />
                                                </div>
                                                <div className='content'>
                                                    <div>
                                                        <input
                                                            type="text"
                                                            name=""
                                                            placeholder="ville"
                                                            required
                                                            defaultValue={updateProche.ville}
                                                        />
                                                    </div>
                                                    <div>
                                                        <input
                                                            type="text"
                                                            name=""
                                                            placeholder="code postal"
                                                            required
                                                            defaultValue={updateProche.codePost_pat}
                                                            onChange={(e) => { setPatient({ ...patient, codePost_pat: e.target.value }); setCodePost_pat(e.target.value) }}
                                                        />
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </ModelBody>
                                    <ModelFooter>
                                        <button className='btn-Model'
                                            onClick={modifierAnathorProche}
                                        >Enregistrer </button>
                                        <button className='btn-retirer-proche'
                                            onClick={() => { setShowModifierPInfo(false); setShowSupprimerProche(true); setIdProche(updateProche.id) }}
                                        >Retirer ce Proche</button>
                                    </ModelFooter>
                                </div>
                            </Model>}
                        <Model
                            show={showSupprimerProche}
                            setShow={setShowSupprimerProche}
                        >
                            <div className=" container-suprimer-compte">
                                <ModelHeader className="model-header">
                                    <h3>Voulez-vous vraiment supprimer votre proche ?</h3>
                                </ModelHeader>
                                <ModelBody className="model-body">
                                    <form action="">
                                        <div>
                                            <label htmlFor="">Mot de passe
                                            </label>
                                            <input
                                                type="password"
                                                name=""
                                                placeholder="Saisir votre mot de passe"
                                                required
                                            />
                                            <img src="../icons/eye-off.png" alt="" onClick={togglePassw} />
                                        </div>
                                        <div>
                                            <label htmlFor="">Confirmation de mot de passe</label>
                                            <input
                                                type="password"
                                                name=""
                                                placeholder="Confirmez votre mot de passe"
                                                required
                                            />

                                            <img src="../icons/eye-off.png" alt="" />


                                        </div>
                                    </form>
                                </ModelBody>
                                <ModelFooter>
                                    <div className="autorisation-footer-compte">
                                        <button className='btn-Model' onClick={() => setShowSupprimerProche(false)} >Fermer </button>
                                        <button className='btn-Model'
                                            onClick={deleteProche}>
                                            Supprimer Mon Compte</button></div>
                                </ModelFooter>
                            </div>
                        </Model>
                    </div>) : (
                    <><div className="container-card-info">
                        {ActiveMoi &&
                            <div className="body">
                                <div>
                                    <h3>{data.civilite_pat}  {data.nom_pat} {data.prenom_pat} </h3>
                                    <div className='info-body'>
                                        <p>{data.dateNaissance}- 26 ans</p>
                                        <p>{data.adresse_pat}, {data.codePost_pat}</p>
                                    </div>
                                    <button id="btn-moi" >Moi</button>
                                </div>
                                <div>
                                    <button onClick={() => setShowModelPartage(true)}> <img src="/icons/share.svg" alt="" /> Partager Dossier </button>
                                    <span style={{ cursor: 'pointer' }} onClick={() => setShowModifierMInfo(true)}> <img src="/icons/update-icon.svg" alt="" /></span>
                                </div>
                            </div>
                        }
                        <Model
                            show={showModifierMInfo}
                            setShow={setShowModifierMInfo}
                        >
                            <div className="container-addProche">
                                <ModelHeader className="model-header">
                                    <h3>Modifier mes informations</h3>
                                    <img className='close-black' src="/icons/black-close.svg" alt="" onClick={() => setShowModifierMInfo(false)} />
                                </ModelHeader>
                                <ModelBody className="model-body">
                                    <div>
                                        <form action="">
                                            <div>
                                                <label htmlFor="">Civilité</label>
                                                <div className='addForm'>
                                                    <label htmlFor="madame" className="input-check-box1">
                                                        <input
                                                            required
                                                            type="radio"
                                                            name="Civilité"
                                                            id="madame"
                                                        />
                                                        <div className="input-doth"></div>
                                                        <span>Madame</span>
                                                    </label>
                                                    <label htmlFor="monsieur" className="input-check-box">
                                                        <input
                                                            required
                                                            type="radio"
                                                            name="Civilité"
                                                            id="monsieur"
                                                        />
                                                        <div className="input-doth"></div>
                                                        <span>Monsieur</span>
                                                    </label>
                                                </div>
                                            </div>
                                            <div className='content'>
                                                <div>
                                                    <label htmlFor="">Prénom
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name=""
                                                        placeholder="Saisir votre Prénom"
                                                        required
                                                        onChange={(e) => setPrenom_pat(e.target.value)}
                                                        defaultValue={data.prenom_pat}
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor="">Nom
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name=""
                                                        placeholder="Nom"
                                                        required
                                                        onChange={(e) => setNom_pat(e.target.value)}
                                                        defaultValue={data.nom_pat}
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor="">Date de naissance
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name=""
                                                        placeholder="Date de naissance"
                                                        required
                                                        onChange={(e) => setDateNaissance(e.target.value)}
                                                        defaultValue={data.dateNaissance}
                                                    />
                                                    <span id='age'>07ans</span>
                                                </div>
                                                <div>
                                                    <label htmlFor="">Lieu de naissance
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name=""
                                                        placeholder="Lieu de naissance"
                                                        required
                                                        onChange={(e) => setPlaceOfBirth(e.target.value)}
                                                        defaultValue={data.placeOfBirth}
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor="">Adresse e-mail
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name=""
                                                        placeholder="Adresse e-mail"
                                                        required
                                                        onChange={(e) => setEmailPat(e.target.value)}
                                                        defaultValue={data.patientEmail}
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor="">Téléphone
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name=""
                                                        placeholder="Téléphone"
                                                        required
                                                        onChange={(e) => setTelephone(e.target.value)}
                                                        defaultValue={data.patientTelephone}
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor="">N° de Mutuelle / CNSS / CNOP
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name=""
                                                        placeholder="N° de Mutuelle / CNSS / CNOP"
                                                        required
                                                        onChange={(e) => setMutuelNumber(e.target.value)}
                                                        defaultValue={data.mutuelNumber}
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor="">Matricule

                                                    </label>
                                                    <input
                                                        type="text"
                                                        name=""
                                                        placeholder="N° de patient"
                                                        required
                                                        onChange={(e) => setMatricule_pat(e.target.value)}
                                                        defaultValue={data.matricule_pat}
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                            <div className='adresse'>
                                                <label htmlFor="">Adresse

                                                </label>
                                                <input
                                                    type="text"
                                                    name=""
                                                    placeholder="Adresse"
                                                    required
                                                    onChange={(e) => setAdresse_pat(e.target.value)}
                                                    defaultValue={data.adresse_pat}
                                                />
                                            </div>
                                            <div className='content'>
                                                <div>
                                                    <input
                                                        type="text"
                                                        name=""
                                                        placeholder="Ville"
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <input
                                                        type="text"
                                                        name=""
                                                        placeholder="Code postal"
                                                        required
                                                        onChange={(e) => setCodePost_pat(e.target.value)}
                                                        defaultValue={data.codePost_pat}
                                                    />
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </ModelBody>
                                <ModelFooter>
                                    <button className='btn-Model' onClick={modifierProche}>Enregistre </button>
                                </ModelFooter>
                            </div>
                        </Model>
                        <Model
                            show={showModelPartage}
                            setShow={setShowModelPartage}
                        > <div className="partagewith">
                                <ModelHeader className="model-header">
                                    <h4>Partager Avec</h4>
                                    <img className='close-black' src="/icons/black-close.svg" alt="" onClick={() => setShowModelPartage(false)} />
                                </ModelHeader>
                                <ModelBody className="model-body">
                                    <div className="partage-avec">
                                        <div>
                                            <label htmlFor="MohamedBouy">Dr Mohamed Bouy
                                                <input id='MohamedBouy' type="radio" name='partageAvec' />
                                                <div className="radio-button"></div></label>
                                        </div>
                                        <div>
                                            <label htmlFor="mohamed">Dr Mohamed
                                                <input id='mohamed' type="radio" name='partageAvec' />
                                                <div className="radio-button"></div></label>
                                        </div>
                                        <div>
                                            <label htmlFor="MohaBouy">Dr MohaBouy
                                                <input id='MohaBouy' type="radio" name='partageAvec' />
                                                <div className="radio-button"></div></label>
                                        </div>
                                        <div>
                                            <label htmlFor="Moha">Dr Moha
                                                <input id='Moha' type="radio" name='partageAvec' />
                                                <div className="radio-button"></div>
                                            </label>
                                        </div>
                                        <div>
                                            <label htmlFor="Moha1">Dr Moha
                                                <input id='Moha1' type="radio" name='partageAvec' />
                                                <div className="radio-button"></div>
                                            </label>
                                        </div>
                                        <div>
                                            <label htmlFor="Dr2">Dr Mohamed Bouy
                                                <input id='Dr2' type="radio" name='partageAvec' />
                                                <div className="radio-button"></div>
                                            </label>
                                        </div>
                                        <div>
                                            <label htmlFor="Dr3">Dr Mohamed
                                                <input id='Dr3' type="radio" name='partageAvec' />
                                                <div className="radio-button"></div>
                                            </label>
                                        </div>
                                        <div>
                                            <label htmlFor="Dr4">Dr MohaBouy
                                                <input id='Dr4' type="radio" name='partageAvec' />
                                                <div className="radio-button"></div>
                                            </label>
                                        </div>
                                    </div>
                                </ModelBody>
                                <ModelFooter>
                                    <button className='btn-Model' id="hoverbtn" onClick={() => setShowModelPartage(false)}>Envoyer <img id="icon" src="/icons/flech-white.svg" alt="" /></button>
                                </ModelFooter>
                            </div>
                        </Model>
                        {ActiveProche &&
                            allProche &&
                            allProche.map((proche) => (
                                <div className="body" key={proche} >

                                    <div>
                                        <h3>{proche.civilite_pat} {proche.nom_pat} {proche.prenom_pat} </h3>
                                        <div className='info-body'>
                                            <p>{proche.dateNaissance}- 32 ans</p>
                                            <p>{proche.adresse_pat}, {proche.codePost_pat} </p>
                                        </div>
                                        <button>Proche</button>
                                    </div>
                                    <div>
                                        <button onClick={() => setShowModelPartage(true)}> <img src="/icons/share.svg" alt="" /> Partager Dossier </button>
                                        <span style={{ cursor: 'pointer' }} onClick={() => {
                                            setShowModifierPInfo(true); setUpdateProche(proche);
                                            setCivilite_pat(proche.civilite_pat)
                                            setNom_pat(proche.nom_pat);
                                            setPlaceOfBirth(proche.placeOfBirth);
                                            setPrenom_pat(proche.prenom_pat)
                                            setTelephone(proche.patientTelephone)
                                            setAdresse_pat(proche.adresse_pat);
                                            setCodePost_pat(proche.codePost_pat);
                                            setDateNaissance(proche.dateNaissance);
                                            setEmailPat(proche.patientEmail);
                                            setMatricule_pat(proche.matricule_pat);
                                            setMutuelNumber(proche.mutuelNumber);
                                        }}> <img src="/icons/update-icon.svg" alt="" /></span>
                                    </div>
                                </div>
                            ))}

                        {showModifierPInfo &&
                            <Model
                                show={showModifierPInfo}
                                setShow={setShowModifierPInfo}
                            >
                                <div className="container-addProche atherProche">
                                    <ModelHeader className="model-header">
                                        <h3>Modifier les informations d’un proche</h3>
                                        <img className='close-black' src="/icons/black-close.svg" alt="" onClick={() => setShowModifierPInfo(false)} />
                                    </ModelHeader>
                                    <ModelBody className="model-body">
                                        <div>
                                            <form action="" onChange={() => setIdProche(updateProche.id)}>
                                                <div>
                                                    <label htmlFor="">Civilité</label>
                                                    <div className='addForm'>
                                                        <label htmlFor="dame" className="input-check-box1">
                                                            <input
                                                                required
                                                                type="radio"
                                                                name="Civilité"
                                                                id="dame"
                                                                onClick={() => setCivilite_pat("Mme")}
                                                            />
                                                            <div className="input-doth"></div>
                                                            <span>Madame</span>
                                                        </label>
                                                        <label htmlFor="Mrs" className="input-check-box">
                                                            <input
                                                                required
                                                                type="radio"
                                                                name="Civilité"
                                                                id="Mrs"
                                                                onClick={() => setCivilite_pat("Mr")}
                                                            />
                                                            <div className="input-doth"></div>
                                                            <span>Monsieur</span>
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className='content'>
                                                    <div>
                                                        <label htmlFor="">Prénom
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name=""
                                                            placeholder="Saisir votre Prénom"
                                                            required
                                                            defaultValue={updateProche.prenom_pat}
                                                            onChange={(e) => setPrenom_pat(e.target.value)}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label htmlFor="">Nom
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name=""
                                                            placeholder="Nom"
                                                            required
                                                            defaultValue={updateProche.nom_pat}
                                                            onChange={(e) => setNom_pat(e.target.value)}

                                                        />
                                                    </div>
                                                    <div>
                                                        <label htmlFor="">Date de naissance
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name=""
                                                            placeholder="Date de naissance"
                                                            required
                                                            defaultValue={updateProche.dateNaissance}
                                                            onChange={(e) => setDateNaissance(e.target.value)}
                                                        />
                                                        <span id='age'>07ans</span>
                                                    </div>
                                                    <div>
                                                        <label htmlFor="">Lieu de naissance
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name=""
                                                            placeholder="Lieu de naissance"
                                                            required
                                                            defaultValue={updateProche.placeOfBirth}
                                                            onChange={(e) => setPlaceOfBirth(e.target.value)}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label htmlFor="">Adresse e-mail
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name=""
                                                            placeholder="Adresse e-mail"
                                                            required
                                                            defaultValue={updateProche.patientEmail}
                                                            onChange={(e) => setEmailPat(e.target.value)}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label htmlFor="">Téléphone
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name=""
                                                            placeholder="Téléphone"
                                                            required
                                                            defaultValue={updateProche.patientTelephone}
                                                            onChange={(e) => setTelephone(e.target.value)}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label htmlFor="">N° de Mutuelle / CNSS / CNOP
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name=""
                                                            placeholder="N° de Mutuelle / CNSS / CNOP"
                                                            required
                                                            defaultValue={updateProche.mutuelNumber}
                                                            onChange={(e) => setMutuelNumber(e.target.value)}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label htmlFor="">Matricule

                                                        </label>
                                                        <input
                                                            type="text"
                                                            name=""
                                                            placeholder="N° de patient"
                                                            required
                                                            defaultValue={updateProche.matricule_pat}
                                                            onChange={(e) => setMatricule_pat(e.target.value)}
                                                            disabled
                                                        />
                                                    </div>
                                                </div>
                                                <div className='adresse'>
                                                    <label htmlFor="">Adresse

                                                    </label>
                                                    <input
                                                        type="text"
                                                        name=""
                                                        placeholder="Adresse"
                                                        required
                                                        defaultValue={updateProche.adresse_pat}
                                                        onChange={(e) => setAdresse_pat(e.target.value)}
                                                    />
                                                </div>
                                                <div className='content'>
                                                    <div>
                                                        <input
                                                            type="text"
                                                            name=""
                                                            placeholder="ville"
                                                            required
                                                            defaultValue={updateProche.ville}
                                                        />
                                                    </div>
                                                    <div>
                                                        <input
                                                            type="text"
                                                            name=""
                                                            placeholder="code postal"
                                                            required
                                                            defaultValue={updateProche.codePost_pat}
                                                            onChange={(e) => setCodePost_pat(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </ModelBody>
                                    <ModelFooter>
                                        <button className='btn-Model'
                                            onClick={modifierAnathorProche}
                                        >Enregistrer </button>
                                        <button className='btn-retirer-proche'
                                            onClick={() => { setShowModifierPInfo(false); setShowSupprimerProche(true); setIdProche(updateProche.id) }}
                                        >Retirer ce Proche</button>
                                    </ModelFooter>
                                </div>
                            </Model>}
                        <Model
                            show={showSupprimerProche}
                            setShow={setShowSupprimerProche}
                        >
                            <div className=" container-suprimer-compte">
                                <ModelHeader className="model-header">
                                    <h3>Voulez-vous vraiment supprimer votre proche ?</h3>
                                </ModelHeader>
                                <ModelBody className="model-body">
                                    <form action="">
                                        <div>
                                            <label htmlFor="">Mot de passe
                                            </label>
                                            <input
                                                type="password"
                                                name=""
                                                placeholder="Saisir votre mot de passe"
                                                required
                                            />
                                            <img src="../icons/eye-off.png" alt="" onClick={togglePassw} />
                                        </div>
                                        <div>
                                            <label htmlFor="">Confirmation de mot de passe</label>
                                            <input
                                                type="password"
                                                name=""
                                                placeholder="Confirmez votre mot de passe"
                                                required
                                            />

                                            <img src="../icons/eye-off.png" alt="" />


                                        </div>
                                    </form>
                                </ModelBody>
                                <ModelFooter>
                                    <div className="autorisation-footer-compte">
                                        <button className='btn-Model' onClick={() => setShowSupprimerProche(false)} >Fermer </button>
                                        <button className='btn-Model'
                                            onClick={deleteProche}>
                                            Supprimer Mon Compte</button></div>
                                </ModelFooter>
                            </div>
                        </Model>
                    </div></>
                )
                }
            </div>
            <div className="supprimer-moncompte">
                <p>Vous pouvez supprimer votre compte sur clinital.io et les données qui y sont associées. Cependant, veuillez noter que cette action ne supprimera pas automatiquement vos données personnelles des bases de données des professionnels de santé avec lesquels vous avez pris rendez-vous et/ou consulté. Ces professionnels peuvent avoir des motifs légitimes pour conserver ces données. Si vous souhaitez exercer vos droits d'accès, de rectification ou de suppression, veuillez contacter directement les professionnels concernés.</p>
                <a href="#" onClick={() => setShowSupprimerCompte(true)} >Supprimer mon compte</a>
            </div>
            <Model
    show={showSupprimerCompte}
    setShow={setShowSupprimerCompte}
>
    <div className="container-suprimer-compte">
    <form onSubmit={handleSubmit(CheckPassword)}>
        <ModelHeader className="model-header">
            <h3>Voulez-vous réellement supprimer votre compte ?</h3>
        </ModelHeader>
        <ModelBody className="model-body">
           
                <div>
                    <label htmlFor="">Mot de passe</label>
                    <input
                        type={eyepassOff ? "password" : "text"}
                        name="confirmepassword"
                        className={`${errors.password && "err-input"}`}
                        placeholder="Saisir votre mot de passe"
                        {...register("password", {
                            required: 'Password is required',
                        })}
                    />
                    {errors.password && <span className='err'>{errors.password.message}</span>}
                    {eyepassOff ?
                        <img src="../icons/eye-off.png" alt="" onClick={() => seteyepassOff(false)} />
                        :
                        <img src="../icons/eye-on.svg" alt="" onClick={() => seteyepassOff(true)} />
                    }
                </div>
                <div>
                    <label htmlFor="">Confirmation de mot de passe</label>
                    <input
                        type={eyepassOn ? "password" : "text"}
                        name="confirmepassword"
                        placeholder="Confirmez votre mot de passe"
                        className={`${errors.confirmpassword && "err-input"}`}
                        {...register("confirmpassword", {
                            required: 'Confirm password is required',
                            validate: (value) =>
                                value === password || "the passwords do not match",
                        })}
                        onPaste={(e) => {
                            e.preventDefault();
                            return false;
                        }}
                    />
                    {errors.confirmpassword && <span className='err'>{errors.confirmpassword.message}</span>}
                    {eyepassOn ?
                        <img src="../icons/eye-off.png" alt="" onClick={() => seteyepassOn(false)} />
                        :
                        <img src="../icons/eye-on.svg" alt="" onClick={() => seteyepassOn(true)} />
                    }
                </div>
           
          
        </ModelBody>
        <ModelFooter>
                    <div className="autorisation-footer-compte">
                        <button className='btn-Model' onClick={() => setShowSupprimerCompte(false)}>Fermer</button>
                        <button type="submit" className='btn-Model'>Supprimer Mon Compte</button>
                    </div>
                </ModelFooter>
     </form>
    </div>
</Model>

            <Model
                show={showCondition}
                setShow={setShowCondition}
            >
                <div className=" condition">
                    <ModelHeader className="model-header">
                        <h3>À lire avant de supprimer votre compte !</h3>
                    </ModelHeader>
                    <ModelBody className="model-body">
                        <div>
                            <p>Toutes les données liées à votre compte seront effacées et ne pourront pas être récupérées.</p>
                            {cd1 ? <span>
                                <img src="/icons/check.svg" alt="" /> </span> : <span>
                                <button className='btn-Model' onClick={() => setCd1(true)}>J’accepte</button></span>
                            }
                        </div>
                        <div>
                            <p>Vous n'aurez plus accès à l'historique de vos rendez-vous, vos documents, votre agenda ou tout autre contenu lié à votre compte.</p>
                            {cd2 ?
                                <span><img src="/icons/check.svg" alt="" /> </span> : <span>
                                    <button className='btn-Model' onClick={() => setCd2(true)}>J’accepte</button></span>
                            }                        </div>
                        <div>
                            <p>Si vous avez des rendez-vous prévus, qu'ils soient au cabinet ou à distance, ils pourraient être impactés ou annulés.</p>
                            {cd3 ? <span>
                                <img src="/icons/check.svg" alt="" /> </span> :
                                <span>
                                    <button className='btn-Model' onClick={() => setCd3(true)}>J’accepte</button>
                                </span>
                            }
                        </div>
                        <div>
                            <p>Vous perdrez l'accès aux avantages et fonctionnalités réservés aux utilisateurs enregistrés.</p>
                            {cd4 ? <span>
                                <img src="/icons/check.svg" alt="" /> </span> :
                                <span>
                                    <button className='btn-Model' onClick={() => setCd4(true)}>J’accepte</button>
                                </span>
                            }
                        </div>
                    </ModelBody>
                    <ModelFooter>
                        <div className="autorisation-footer-compte lire">
                            <button className='btn-Model' onClick={() => setShowCondition(false)} >Fermer </button>
                            <button className='btn-Model' onClick={codeEmail}>Supprimer mon compte</button></div>
                    </ModelFooter>
                </div>
            </Model>
            <Model
                show={showCodeEmail}
                setShow={setShowCodeEmail}
            >
                <div className=" codeRecu">
                    <ModelHeader className="model-header">
                        <h3>Réception du code</h3>
                    </ModelHeader>
                    <ModelBody className="model-body">
                    <><div className="link">
                             <a href="#" className='active' ><img src="/icons/mail-outline-white.svg" alt="" />Recevoir le code par e-mail</a>
                            </div>
                                <form action="">
                                    <div>
                                        <label htmlFor="">Adresse e-mail

                                        </label>
                                        <input
                                            type="text"
                                            name=""
                                            placeholder="Saisir votre Adresse e-mail"
                                            value={emailConfirmation}
                                            onChange={(e) => setEmailConfirmation(e.target.value)}
                                            
                                        />
                                        <a href="#" className='Envoyer-code' onClick={handleSendConfirmationCode}>Envoyer Le code</a>

                                    </div>
                                    <br />
                                    <div>
                                        <label htmlFor="">Code de Confirmation</label>
                                        <input
                                            type="text"
                                            name=""
                                            placeholder="Saisir votre code de confirmation"
                                            onChange={(e) => setConfirmation(e.target.value)}
                                            value={confirmation}
                                        />
                                    </div>
                                </form></>
                    </ModelBody>
                    <ModelFooter>
                        <div className="autorisation-footer-compte">
                            <button className='btn-Model' onClick={() => setShowCodeEmail(false)} >Fermer </button>
                            <button className='btn-Model' onClick={supprimerCompte}>Supprimer Mon Compte</button>
                        </div>
                    </ModelFooter>
                </div>
            </Model>
        </div >
        <Footer />
    </>

    );
};

export default MonCompte