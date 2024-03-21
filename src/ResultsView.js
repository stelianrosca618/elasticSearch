import { useState } from "react"

export const ResultsView = (props) => {
    // console.log(props);
    const [isShort, setIsShort] = useState(true);
    return (
        <>
            <div className="sui-result">
                <div className="sui-result__header">
                   <a className="text-start text-blue" href={props.result.url.raw}><span className="sui-result__title">{props.result.title.raw}</span></a> 
                </div>
                <div className="sui-result__body px-4 py-2 d-block text-start">
                    <p className="py-1"><span className="fw-bold">Organisation</span> {props.result.organisation_name.snippet}</p>
                    <p className="py-1"><span className="fw-bold">Applications:</span> {props.result.applications.snippet}</p>
                    <p className="py-1"><span className="fw-bold">Technologies:</span> {props.result.technologies.snippet}</p>
                    <p className={isShort?"sui-result__value text-start py-1 detail-shortView" : "sui-result__value text-start py-1"}>
                        {props.result.text.raw}
                    </p>
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