const Progress_bar = ({bgcolor,progress,height}) => {

  /* Stying progress bar */
    const Parentdiv = {
        height: height,
        width: '60%',
        backgroundColor: 'whitesmoke',
        borderRadius: 40,
        margin:'auto',
        marginBottom:30
      }
      
      const Childdiv = {
        height: '60%',
        width: `${progress}%`,
        backgroundColor: bgcolor,
        borderRadius:40,
        textAlign: 'right'
      }
      
      const progresstext = {
        padding: 10,
        color: 'black',
        fontWeight: 900
      }
        
    return (
    <div>
        <h3>progress</h3>    
        <div style={Parentdiv}>
        <div style={Childdiv}>
             <span style={progresstext}>{`${progress}%`}</span>
        </div>
        </div>
    </div>

    )
  }

  export default Progress_bar