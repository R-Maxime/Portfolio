import React, { useEffect, useState } from 'react';
import Contact from '../../datas/Contact';
import '../../styles/Home/Contact.scss';

const isMailValid = (email: string): boolean => {
  const regex = /^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/;
  return regex.test(email);
};

function ContactForm(): React.ReactElement {
  const [mailError, setMailError] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = data.get('name')?.toString();
    const mail = data.get('mail')?.toString();
    const message = data.get('message')?.toString();
    const phone = data.get('phone')?.toString() || '';

    if (mail && !isMailValid(mail)) {
      setMailError(true);
      return;
    }

    if (mailError) {
      setMailError(false);
    }

    if (!name || !mail || !message) {
      return;
    }

    Contact.send({
      name, mail, message, phone
    }).then((response) => {
      if (response?.status === 200) {
        setSubmitSuccess(true);
        setSubmitError(false);
        return;
      }

      setSubmitError(true);
    }).catch(() => {
      setSubmitError(true);
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const succes = document.querySelector('.contact__success');
      succes?.classList.remove('anim');
      succes?.classList.add('close');
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 500);
    }, 3500);

    return () => {
      clearTimeout(timer);
    };
  }, [submitSuccess]);

  return (
    <>
      <div className="contact anim">
        <h1>Contact</h1>
        {submitError && <span className='error'>Une erreur est survenue, veuillez réessayer plus tard</span>}
        <form className='contact__form' onSubmit={handleSubmit}>
          <div className='contact__form-input name'>
            <label htmlFor='name'>Nom/Prénom</label>
            <input type='text' name='name' id='name' placeholder='Nom et prénom' required={true} />
          </div>
          <div className='contact__form-input mail'>
            <label htmlFor='mail'>Email</label>
            <input type='text' name='mail' id='mail' placeholder='Adresse e-mail' required={true} />
            {mailError && <span className='mail-error'>Adresse e-mail invalide</span>}
          </div>
          <div className='contact__form-input phone'>
            <label htmlFor='phone'>Téléphone</label>
            <input type='text' name='phone' id='phone' placeholder='Numéro de téléphone' />
          </div>
          <div className='contact__form-input message'>
            <label htmlFor='message'>Message</label>
            <textarea
              name='message'
              id='message'
              placeholder='Votre message'
              required={true}
              style={{
                resize: 'vertical',
                minHeight: '100px',
                maxHeight: '300px'
              }}
            />
          </div>
          <button type='submit'>Envoyer</button>
        </form>
      </div>
      {submitSuccess && (
        <div className='contact__success anim'>
          <span>Votre message a bien été envoyé</span>
        </div>
      )}
    </>
  );
}

export default ContactForm;
