document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('lead-form');
  const submitBtn = document.getElementById('submit-btn');
  const formWrapper = document.getElementById('form-wrapper');
  const successMessage = document.getElementById('success-message');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const rodo = form.querySelector('#rodo');
    if (!rodo.checked) {
      alert('Zaznacz zgodę na przetwarzanie danych osobowych (RODO).');
      return;
    }

    const payload = {
      name: form.name.value.trim(),
      phone: form.phone.value.trim(),
      city: form.city.value.trim(),
    };

    submitBtn.disabled = true;
    submitBtn.textContent = 'Wysyłanie…';

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        formWrapper.classList.add('hidden');
        successMessage.classList.remove('hidden');
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        throw new Error(data.message || 'Błąd wysyłki');
      }
    } catch {
      alert('Nie udało się wysłać formularza. Zadzwoń: +48 500 100 200');
      submitBtn.disabled = false;
      submitBtn.textContent = 'Wyślij zapytanie';
    }
  });
});
