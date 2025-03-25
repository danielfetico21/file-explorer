/**
 * Derulează elementul în vizor doar dacă nu este deja complet vizibil în viewport.
 *
 * - Verifică dacă elementul este complet în interiorul ferestrei (`top` și `bottom`)
 * - Dacă nu este vizibil complet, îl derulează în mod "smooth" cu `block: 'nearest'`
 *
 * @param el - Elementul HTML care trebuie adus în viewport
 */
export function scrollIntoViewIfNeeded(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  const inView = rect.top >= 0 && rect.bottom <= window.innerHeight;
  if (!inView) {
    el.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
}
