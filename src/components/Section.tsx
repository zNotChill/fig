
function Section(props: { title: string, children?: React.ReactNode}) {
  return (
    <div className="section">
      <div className="section-title">{props.title}</div>
      <div className="section-content">
        {props.children}
      </div>
    </div>
  );
}

export default Section;