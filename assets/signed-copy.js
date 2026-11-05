// Enables the "Signed copy" checkbox only for signable variants (e.g. Hardcover).
// Listens to Dawn's variant-change pub/sub event and to the product form's id input.
if (!customElements.get('signed-copy')) {
  customElements.define(
    'signed-copy',
    class SignedCopy extends HTMLElement {
      connectedCallback() {
        this.input = this.querySelector('.signed-copy__input');
        this.note = this.querySelector('.signed-copy__note');
        if (!this.input) return;

        // No data-signable attribute means every variant can be signed.
        this.signable = this.hasAttribute('data-signable')
          ? this.dataset.signable.split(',').filter(Boolean)
          : null;

        const form = document.getElementById(this.input.getAttribute('form'));
        this.idInput = form?.querySelector('input[name="id"]');
        this.onIdChange = () => this.update(this.idInput.value);
        this.idInput?.addEventListener('change', this.onIdChange);

        if (typeof subscribe === 'function' && typeof PUB_SUB_EVENTS !== 'undefined') {
          this.unsubscribe = subscribe(PUB_SUB_EVENTS.variantChange, (event) => {
            if (event.data?.sectionId !== this.dataset.section) return;
            this.update(event.data.variant?.id);
          });
        }

        if (this.idInput) this.update(this.idInput.value);
      }

      disconnectedCallback() {
        this.idInput?.removeEventListener('change', this.onIdChange);
        this.unsubscribe?.();
      }

      update(variantId) {
        const ok = !this.signable || this.signable.includes(String(variantId));
        this.input.disabled = !ok;
        if (!ok) this.input.checked = false;
        this.classList.toggle('signed-copy--unavailable', !ok);
        const text = ok ? this.dataset.noteOn : this.dataset.noteOff;
        if (this.note && this.note.textContent !== text) this.note.textContent = text || '';
      }
    }
  );
}
