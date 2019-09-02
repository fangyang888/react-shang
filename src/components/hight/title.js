export default  function withHeader(){
    return function (WrappedComponent) {
       class HOC extends Component {
        render() {
          return <div>
            <div className="demo-header">
              我是标题2222
            </div>
            <WrappedComponent {...this.props} book={'123'}/>
          </div>
        }
      }
    }
  
  }