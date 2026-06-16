document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('lead-form');
  const submitBtn = document.getElementById('submit-btn');
  const formWrapper = document.getElementById('form-wrapper');
  const successMessage = document.getElementById('success-message');
  const submitLabel = 'Oblicz koszt montażu';

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const objectType = form.querySelector('input[name="objectType"]:checked');
    const surface = form.querySelector('input[name="surface"]:checked');
    const rodo = form.querySelector('#rodo');

    if (!objectType) {
      alert('Wybierz rodzaj obiektu.');
      return;
    }
    if (!surface) {
      alert('Wybierz powierzchnię.');
      return;
    }
    if (!rodo.checked) {
      alert('Zaznacz zgodę na przetwarzanie danych osobowych (RODO).');
      return;
    }

    const payload = {
      name: form.name.value.trim(),
      phone: form.phone.value.trim(),
      objectType: objectType.value,
      surface: surface.value,
    };

    submitBtn.disabled = true;
    submitBtn.textContent = 'Obliczanie…';

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
      submitBtn.textContent = submitLabel;
    }
  });
});
