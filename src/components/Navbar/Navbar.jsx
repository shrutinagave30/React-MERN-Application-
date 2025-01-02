import './navbar.css'

function Navbar(params) {
  return (
    <div id="navbar">
          <div className='item' id='item1'>Restaurant</div>
          <div className='item' id='item2' >{params.content}</div>
    </div>
  )
  
}

export default Navbar