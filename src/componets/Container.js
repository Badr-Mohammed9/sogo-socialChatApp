import Headr from "./Headr"

function Container({children}) {
  return (
    <div style={{overflowY:'hidden'}}>
    <Headr/>
    <div style={{
        width:'100%',
        height:'100vh',
        backgroundColor:'#222222',
        overflowY:'hidden'
    }}>
        {children}
    </div>
    </div>
  )
}

export default Container
