document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('lead-form');
  const submitBtn = document.getElementById('submit-btn');
  const modal = document.getElementById('success-modal');
  const modalContent = modal?.querySelector('div');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const submitLabel = 'Oblicz koszt montażu';

  const openModal = () => {
    if (!modal || !modalContent) return;
    modal.classList.remove('opacity-0', 'pointer-events-none');
    modal.classList.add('opacity-100', 'pointer-events-auto');
    modalContent.classList.remove('scale-95');
    modalContent.classList.add('scale-100');
  };

  const closeModal = () => {
    if (!modal || !modalContent) return;
    modal.classList.remove('opacity-100', 'pointer-events-auto');
    modal.classList.add('opacity-0', 'pointer-events-none');
    modalContent.classList.remove('scale-100');
    modalContent.classList.add('scale-95');
  };

  closeModalBtn?.addEventListener('click', closeModal);

  modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

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
        form.reset();
        openModal();
      } else {
        throw new Error(data.message || 'Błąd wysyłki');
      }
    } catch {
      alert('Nie udało się wysłać formularza. Zadzwoń: +48 500 100 200');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = submitLabel;
    }
  });
});
