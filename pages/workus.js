import React, { useMemo, useRef, useState } from 'react';
import Us from '../assets/us.jpg'
import Prof from '../assets/bg-prof.jpg'
import Art from '../assets/bg-art.jpg'
import Image from 'next/image';
import FormArtesan from '../component/FormArtesan';
import FormProfessional from '../component/FormProfessional';
import FormWorkUs from '../component/FormWorkus';
import UserFormLib from '../component/UserForm';

const ContactUs = ({type}) =>
{
    const [eMail, setMail] = useState('tecnico@casalvi.it')
    const [eMailBy, setByMail] = useState('')
    const [name, setName] = useState('')
    const [message, setMessage] = useState('')
    const form = useRef();

    //const memoMail = useMemo(()=> {
    //    return `mailto:${eMail}?subject=${name}&body=${message}+ ${eMailBy}`
    //})
    

    return (
        <div style={ { display: 'flex', alignItems: 'center', paddingTop:'100px', width: '100%', justifyContent: 'center',  } }>
            <div className={type === 'prof' ? 'backgroundColorProf': 'backgroundColor'}></div>
           
            {
                type === 'artigiani' ? <UserFormLib /> : null
            }
            {
                type === 'prof' ? <FormProfessional /> : null
            }
            {
                type === 'noi' ? <FormWorkUs /> : null
            }
        </div>
    );
};
export default ContactUs;