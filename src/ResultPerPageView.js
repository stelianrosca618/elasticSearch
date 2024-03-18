export const ResultsPerPageView = (props) => {
  console.log('itesmPerPages', props)

  return (
    <>
      <div className="form-group d-flex">
        <label className="form-label">Items per Page</label>
        <select className="form-control" value={props.value} onChange={(e) => {props.onChange(parseInt(e.target.value))}}>
          {
            props.options.map((opItem, key) => (
              <option key={key} value={opItem}>{opItem}</option>
            ))
          }
        </select>
      </div>
    </>
  )
}