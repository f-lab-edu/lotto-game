export default function Header({ app }) {
  this.component = document.createElement("header");
  app.appendChild(this.component);

  this.template = () => {
    return `
      <h1>🎱 행운의 로또</h1>
    `;
  };

  this.render = () => {
    this.component.innerHTML = this.template();
  };

  this.render();
}
