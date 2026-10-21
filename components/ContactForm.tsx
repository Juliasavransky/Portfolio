import styled from '@emotion/styled';
import { useRef, useState, type FormEvent } from 'react';
import { Button } from '@/styles/ui';
import { LIMITS } from '@/lib/contact';
import { useT } from '@/lib/i18n';
import { track } from '@/lib/gtag';
import WhatsAppLink from './WhatsAppLink';

const Form = styled.form`
  display: grid;
  gap: 1.25rem;
  max-width: 36rem;
  margin-block-start: 1rem;

  label {
    display: grid;
    gap: 0.375rem;
    font-weight: 700;
  }

  input,
  textarea {
    width: 100%;
    padding: 0.75rem 1rem;
    border: 1px solid var(--input-border);
    border-radius: var(--radius);
    background: var(--surface);
    color: var(--text);
    font-weight: 400;
  }

  input:focus-visible,
  textarea:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 1px;
  }

  textarea {
    resize: vertical;
    min-height: 9rem;
  }

  button {
    justify-self: start;
  }
`;

// Off-screen honeypot. Real visitors never reach it; bots fill it in.
const Trap = styled.div`
  position: absolute;
  inset-inline-start: -100vw;
`;

const Status = styled.p`
  min-height: 1.6em;
  color: var(--accent);
  font-weight: 700;
`;

const Dialog = styled.dialog`
  max-width: min(32rem, 92vw);
  padding: 2rem;
  border: 1px solid var(--divider);
  border-radius: var(--radius);
  background: var(--surface);
  color: var(--text);

  &::backdrop {
    background: rgba(0, 0, 0, 0.6);
  }

  h2 {
    font-size: 1.375rem;
  }

  p {
    margin-block: 0.75rem 1.5rem;
    color: var(--text-muted);
  }

  div {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  }
`;

type Status = 'idle' | 'sending' | 'sent' | 'error';

export default function ContactForm() {
  const t = useT().contact;
  const [status, setStatus] = useState<Status>('idle');
  const dialogRef = useRef<HTMLDialogElement>(null);
  const submitRef = useRef<HTMLButtonElement>(null);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      form.reset();
      setStatus('sent');
      track('generate_lead', { method: 'form' });
    } catch {
      setStatus('error');
      dialogRef.current?.showModal();
    }
  };

  const closeDialog = () => {
    dialogRef.current?.close();
    submitRef.current?.focus();
  };

  return (
    <>
      <Form onSubmit={onSubmit}>
        <label>
          {t.name}
          <input name='name' required maxLength={LIMITS.name} autoComplete='name' />
        </label>
        <label>
          {t.email}
          <input name='email' type='email' required maxLength={LIMITS.email} autoComplete='email' dir='ltr' />
        </label>
        <label>
          {t.message}
          <textarea name='message' required maxLength={LIMITS.message} rows={6} />
        </label>
        <Trap aria-hidden='true'>
          <label>
            Company
            <input name='company' tabIndex={-1} autoComplete='off' />
          </label>
        </Trap>
        <Button ref={submitRef} type='submit' disabled={status === 'sending'}>
          {status === 'sending' ? t.sending : t.send}
        </Button>
        <Status role='status'>{status === 'sent' ? t.sent : ''}</Status>
      </Form>

      <Dialog ref={dialogRef} aria-labelledby='contact-error-title' onClose={() => setStatus('idle')}>
        <h2 id='contact-error-title'>{t.errorTitle}</h2>
        <p>{t.errorBody}</p>
        <div>
          <WhatsAppLink location='form_error'>{t.errorWhatsapp}</WhatsAppLink>
          <Button type='button' $variant='secondary' onClick={closeDialog}>
            {t.errorClose}
          </Button>
        </div>
      </Dialog>
    </>
  );
}
