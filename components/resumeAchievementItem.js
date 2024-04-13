const resumeAchievementItemTemplate = document.createElement('template')

resumeAchievementItemTemplate.innerHTML = `
  <style>
    li {
      position: relative;
      margin-bottom: 3px;
    }

    li:before {
      content: '';
      position: absolute;
      top: 8px;
      left: -12px;
      width: 2px;
      height: 2px;
      border-radius: 50%;
      border: 1px solid var(--slate-500);
    }
  </style>
  <li>
    <slot></slot>
  </li>
`

class ResumeAchievementItem extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })
    shadow.append(resumeAchievementItemTemplate.content.cloneNode(true))
  }
}

customElements.define('resume-achievement-item', ResumeAchievementItem)
