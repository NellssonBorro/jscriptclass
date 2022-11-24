//This code runs when the page loads
window.onload = () =>{
    //Get the elements on the page that we need to use 
    //this is equivalent to document.getElementById
    const input = document.querySelector(".code-textarea"); //first TextArea identified by class name
    const output = document.querySelector(".preview-textarea"); //second TextArea identified by class name
    const run = document.querySelector("#code-run"); //run button identified by id
    const codeclear = document.querySelector("#code-clear"); //clear button for first TextArea identified by id
    const clear = document.querySelector("#preview-clear"); //clear button for second TextArea identified by id

    //Convert the two TextArea to CodeMirror instances
    const editor =  CodeMirror.fromTextArea(input, 
        { lineNumbers: true, 
            mode: "javascript",
            matchBrackets: true,
            autoCloseBrackets: true,
            styleActiveLine: true,
            theme: "default" });  //first TextArea for editor
   
    const preview =  CodeMirror.fromTextArea(output, 
        {lineNumbers: false, 
            readOnly: "nocursor"}); //second TextArea for preview

    //add eventlisteners to the three buttons
    run.addEventListener("click", ()=>{ 
        const code = editor.getValue();
        try {
            //eval runs the javascript code. CodeMirror.Pos(preview.lastLine() gets the position of the next line after the last used line
            preview.replaceRange(eval(code) + "\n", CodeMirror.Pos(preview.lastLine()));  // adds the new output to the preview TextArea
        } catch (error) {            
            preview.replaceRange(error + "\n", CodeMirror.Pos(preview.lastLine())); // adds the error information to the preview TextArea
        }
    });
    codeclear.addEventListener("click", ()=>{
        editor.setValue(""); //clear the code TextArea
    });
    clear.addEventListener("click", ()=>{
        preview.setValue(""); //clear the preview TextArea
    });

}