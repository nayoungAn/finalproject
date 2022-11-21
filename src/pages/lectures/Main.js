import MainCSS from './Main.module.css';

function Main(){

    return (
        <>
            <div className={ MainCSS }>
                내용 들어갈 공간
            </div>
            <div style={ { listStyleType: 'none', display: 'flex'} }>
                페이징바 들어갈 공간
            </div>
           
        </>
    );

}

export default Main;