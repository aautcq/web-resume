const infoItemTemplate = document.createElement('template')

const infoItemStyle = `
  .item {
    display: flex;
    margin-bottom: 10px;
    align-items: center;
  }

  .icon {
    width: 28px;
    height: 28px;
    background: var(--slate-100);
    color: var(--slate-800);
    border-radius: 50%;
    margin-right: 10px;
    font-size: 16px;
    position: relative;
    flex: none;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .data {
    color: var(--slate-100);
  }
`

infoItemTemplate.innerHTML = `
  <style>${infoItemStyle}</style>

  <li class="item">
    <div class="icon">
      <slot name="icon"></slot>
    </div>
    <div class="data">
      <slot></slot>
    </div>
  </li>
`

class InfoItem extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })
    shadow.append(infoItemTemplate.content.cloneNode(true))
  }
}

customElements.define('info-item', InfoItem)
