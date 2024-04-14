const resumeItemTemplate = document.createElement('template')

const resumeItemStyle = `
  h3 {
    margin: 0;
  }

  li {
    position: relative;
  }

  .item--not-last {
    padding-bottom: 20px
  }

  .resume_item_title {
    display: flex;
    gap: 10px;
  }

  .info {
    line-height: 19px;
  }

  .semi-bold {
    font-weight: 600;
    font-size: 14px;
    margin-bottom: 5px;
    color: var(--slate-700);
  }

  .date {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 7px;
  }

  .location {
    font-weight: 300;
    margin-left: 5px;
    font-size: 14px;
    color: var(--slate-500);
  }

  li:before {
    content: '';
    position: absolute;
    top: 5px;
    left: -20px;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    border: 2px solid var(--slate-600);
  }

  li:after {
    content: '';
    position: absolute;
    top: 14px;
    left: -16px;
    width: 2px;
    height: calc(100% - 8px);
    background: var(--slate-600);
  }
`

resumeItemTemplate.innerHTML = `
  <style>${resumeItemStyle}</style>

  <li>
    <div data-dates class="date"></div>
    <div class="info">
      <div class="resume_item_title">
        <h3 class="semi-bold" data-title></h3>
        <span class="location"><slot name="location"></slot></span>
      </div>
      <slot name="description"></slot>
    </div>
  </li>
`

class ResumeItem extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })
    shadow.append(resumeItemTemplate.content.cloneNode(true))
    const isLast = this.getAttribute('last')
    if (isLast === null) {
      this.shadowRoot.querySelector('li').classList.add('item--not-last')
    }
    this.isLast = isLast !== null && isLast !== 'false'
    this.title = this.getAttribute('title')
    this.dates = this.getAttribute('dates')
    this.titleElement = shadow.querySelector('[data-title]')
    this.titleElement.textContent = this.title
    this.datesElement = shadow.querySelector('[data-dates]')
    this.datesElement.textContent = this.dates
  }
}

customElements.define('resume-item', ResumeItem)
