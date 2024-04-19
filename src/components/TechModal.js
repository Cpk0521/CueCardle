

export default function TechModal({switchTechModal}) {
  return (
    <>
        <div className={`overlay show`}>
                <div className="content">
                    <h2>遊び方</h2>
                    <span>©Liber Entertainment Inc.</span>
                    <div className="Tech-container">
                        <p>画像を観察して、その日のキャラクターとカード名を6回の試行で当てよう。</p>
                        <p>答えが間違っている場合やスキップした場合、画像のモザイクは変わります。</p>
                        <p>ぜひ答えてみて、あなたの回答をシェアてしましょう。</p>
                    </div>
                    <div className="square-container">
                        <div className="square-Tech-container">
                            <div className="square" id="skip"></div>
                            <p>スキップ</p>
                        </div>
                        <div className="square-Tech-container">
                            <div className="square" id="error"></div>
                            <p>キャラクターとカード名の両方も不正解です</p>
                        </div>
                        <div className="square-Tech-container">
                            <div className="square" id="almost"></div>
                            <p>キャラクターは正解ですが、カード名は不正解です</p>
                        </div>
                        <div className="square-Tech-container">
                            <div className="square" id="correct"></div>
                            <p>正解</p>
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
