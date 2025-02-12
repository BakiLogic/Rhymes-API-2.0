const KeywordBox = ({rhyme}) =>{
    return (
        <div className= 'keywordbox'>
            <a1>..: {rhyme.palavraChave}</a1>
        </div>
    )
    
}
const searchRes = ({ word, number, error }) => {
    if (error === 0) {
        return (            
            <div className='rhymeBox'>         
                <p>{number}: {word}</p>
            </div>          
        )
    } else {
        return null
    }
  }
  
  export default {
    KeywordBox,
    searchRes,
  }