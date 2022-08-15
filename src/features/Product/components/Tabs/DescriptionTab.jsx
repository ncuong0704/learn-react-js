import DOMPurify from "dompurify";
import { useOutletContext } from "react-router-dom";

DescriptionTab.propTypes = {};

function DescriptionTab(props) {
  const description = useOutletContext();
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(description),
      }}
    ></div>
  );
}

export default DescriptionTab;
