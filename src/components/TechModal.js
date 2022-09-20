

export default function TechModal({switchTechModal}) {
  return (
    <>
        <div className={`overlay show`}>
                <div className="content">
                    <h2>How To Play</h2>
                    <span>©Liber Entertainment Inc.</span>
                    <div className="Tech-container">
                        <p>Look at the Image, then guess the correct charactor and Card title of the day in 6 tries.</p>
                        <p>Skipped or incorrect attempts will zoom more of the Image.</p>
                        <p>Answer in as few tries as possible and share your tries!</p>
                    </div>
                    <div className="square-container">
                        <div className="square-Tech-container">
                            <div className="square" id="skip"></div>
                            <p>Skipped</p>
                        </div>
                        <div className="square-Tech-container">
                            <div className="square" id="error"></div>
                            <p>Charactor and Card title both not correct</p>
                        </div>
                        <div className="square-Tech-container">
                            <div className="square" id="almost"></div>
                            <p>Charactor is correct but Card title is wrong </p>
                        </div>
                        <div className="square-Tech-container">
                            <div className="square" id="correct"></div>
                            <p>Correct</p>
                        </div>
                    </div>
                    <button className="closebtn" onClick={switchTechModal}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                            <path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"/>
                        </svg>
                    </button>
                </div>
            </div>

    </>
  )
}
