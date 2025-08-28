/**
 * Web component that wraps child designs in a full-width container.
 * When the `split` attribute is present (and not "false"), children are
 * distributed into equal sections; otherwise, a single section spans the
 * entire viewport width. Exported for reuse in other projects.
 */
export class DivNest extends HTMLElement {
  connectedCallback() {
    const splitAttr = this.getAttribute('split');
    const split = splitAttr !== null && splitAttr !== 'false';
    this.classList.add('div-container');
    const originalChildren = Array.from(this.children);
    this.innerHTML = '';
    if (split) {
      originalChildren.forEach(child => {
        const section = document.createElement('div');
        section.classList.add('div-section');
        section.appendChild(child);
        this.appendChild(section);
      });
    } else {
      const section = document.createElement('div');
      section.classList.add('div-section');
      section.style.width = '100vw';
      originalChildren.forEach(child => section.appendChild(child));
      this.appendChild(section);
    }
  }
}

customElements.define('div-nest', DivNest);

// Allow module consumers to import the component without side effects.
export default DivNest;