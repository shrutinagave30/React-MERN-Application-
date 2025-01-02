import "./bill.css";
function BillComponent(params) {
  return (
    <>
      <div key={params.index} className="bill">
        <p style={{paddingLeft:"1rem"}}> {params.food}</p>
        <p>{params.price}</p>
        <p> {params.quantity}</p>
        <p style={{paddingRight:"1rem"}}>{params.total}</p>
      </div>
    </>
  );
}

export default BillComponent;
