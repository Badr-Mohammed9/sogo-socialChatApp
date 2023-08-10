import Headr from "./Headr"

function Container({children}) {
  return (
    <>
    <Headr/>
    <div style={{
        width:'100%',
        height:'100vh',
        backgroundColor:'#222222',
    }}>
        {children}
    </div>
    </>
  )
}

export default Container
