const skillProgressTemplate = document.createElement('template')

const skillProgressStyle = `
  .skill {
    display: flex;
    margin-bottom: 10px;
    color: var(--slate-100);
    justify-content: space-between;
    align-items: center;
  }

  .skill_name {
    width: 40%;
  }

  .skill_progress {
    width: 35%;
    margin: 0 5px;
    height: 5px;
    background: var(--slate-500);
    position: relative;
  }

  .skill_progress span {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background: var(--slate-100);
  }

  .skill_per {
    width: 15%;
  }
`

skillProgressTemplate.innerHTML = `
  <style>${skillProgressStyle}</style>

  <li class="skill">
    <div class="skill_name">
      <slot></slot>
    </div>
    <div class="skill_progress">
      <span data-value></span>
    </div>
    <div data-value-text class="skill_per"></div>
  </li>
`

class SkillProgress extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })
    shadow.append(skillProgressTemplate.content.cloneNode(true))
    this.value = this.getAttribute('value')
    this.valueElement = shadow.querySelector('[data-value]')
    this.valueElement.style.width = this.value + '%'
    this.valueTextElement = shadow.querySelector('[data-value-text]')
    this.valueTextElement.textContent = this.value + '%'
  }
}

customElements.define('skill-progress', SkillProgress)
