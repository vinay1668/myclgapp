import React, { useRef } from "react";
import JoditEditor from "jodit-react";


const config = {
  buttons: ["bold", "italic", "link", "unlink", "underline", "source"],
};

const RichTextEditor = ({ initialValue, altered }) => {
  const editor = useRef(null);

  return (
    <div className="editor">
      <JoditEditor
        ref={editor}
        value={initialValue}
        tabIndex={1}
        //   onBlur={(newContent) => getValue(newContent)}
        onBlur={altered}
        
        config={{
          buttons: ['bold', 'italic', 'link' ,'ol', 'ul', 'strikethrough','paragraph','brush','fullsize'],
          readonly: false,
          toolbarAdaptive: false,
          uploader: {
            insertImageAsBase64URI: true
          },
          defaultMode: 1,   
          askBeforePasteFromWord: false,
          askBeforePasteHTML : false,
          defaultActionOnPaste: "insert_only_text",
          disablePlugins:['ol','ul','paragraph'],
          
        }}

        
      />
    </div>
  );
};

export default RichTextEditor;
