export default function ThemeScript() {
  const code = `try{var t=localStorage.getItem("goldrock-theme");if(t==="limestone"||t==="bronze"||t==="night"){document.documentElement.setAttribute("data-theme",t);}}catch(e){}`;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
