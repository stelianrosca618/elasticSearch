import { useEffect, useState } from "react"

export const ResultsView = (props) => {
    // console.log(props);
    const [isShort, setIsShort] = useState(true);
    const [textData, setTextData] = useState(null);
    useEffect(() => {
       let textStr = props.result.text.raw;
       const textSpin = props.result.text.snippet;
       var highWords = textSpin.match(/<em>(.+?)<\/em>/gi);
          console.log(highWords);
          if(highWords){
            highWords.map(wItem => {
                const keyW = wItem.replace('<em>', '').replace('</em>', '');
                textStr = textStr.replace(keyW, wItem);
              })
          }
          
    //    var startId =props.result.text.snippet.indexOf('<em>'); 
    //    var endId = props.result.text.snippet.indexOf('</em>'); 
    //    const resultStr = textSpin.substr(startId+4, (endId - startId-4));
    //    textStr = textStr.replace(resultStr, `<em>${resultStr}</em>`)
       setTextData(textStr);
    },  [props])
    return (
        <>
            <div className="sui-result">
                <div className="sui-result__header">
                   <a className="text-start text-blue" href={props.result.url.raw}><span className="sui-result__title" dangerouslySetInnerHTML={{ __html:props.result.title.snippet}}></span></a> 
                </div>
                <div className="sui-result__body px-4 py-2 d-block text-start">
                    <p className="py-1"><span className="fw-bold">Organisation</span> {props.result.organisation_name.snippet}</p>
                    <p className="py-1"><span className="fw-bold">Applications:</span> {props.result.applications.snippet}</p>
                    <p className="py-1"><span className="fw-bold">Technologies:</span> {props.result.technologies.snippet}</p>
                    {isShort && <div className="text-start py-1">
                       <span dangerouslySetInnerHTML={{ __html:props.result.text.snippet}}></span> 
                    </div>}
                    {!isShort && <div className="text-start py-1" dangerouslySetInnerHTML={{ __html:textData}}>
                        
                    </div>}
                    <div className="d-flex justify-content-end">
                        {isShort && 
                        <span className="viewMode-btn" onClick={() => setIsShort(false)}>Read More</span>
                        }
                        {!isShort && 
                        <span className="viewMode-btn" onClick={() => setIsShort(true)}>Short View</span>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}