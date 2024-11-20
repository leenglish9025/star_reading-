document.addEventListener("DOMContentLoaded", () => {
    const finalResults = JSON.parse(localStorage.getItem("finalResults"));

    // localStorage에 데이터가 없을 경우 처리
    if (!finalResults) {
        alert("결과 데이터를 찾을 수 없습니다. 테스트를 완료하고 다시 시도하세요.");
        return;
    }

    const { level, score } = finalResults;

    // 레벨과 프로그레스 바 업데이트
    document.getElementById("final-level").innerText = level;
    const progressFill = document.getElementById("progress-fill");
    progressFill.style.width = `${(level / 14) * 100}%`;

    // 영역별 성적 테이블 데이터 (예시)
    const scoreData = [
        { area: "문법", correct: 8, score: 80, percentage: "80%" },
        { area: "독해", correct: 7, score: 70, percentage: "70%" },
        { area: "어휘", correct: 9, score: 90, percentage: "90%" }
    ];

    const scoreTable = document.getElementById("score-table");
    scoreData.forEach(row => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${row.area}</td>
            <td>${row.correct}</td>
            <td>${row.score}</td>
            <td>${row.percentage}</td>
        `;
        scoreTable.appendChild(tr);
    });

    // 레이더 차트 생성
    const ctx = document.getElementById("radar-chart").getContext("2d");
    new Chart(ctx, {
        type: "radar",
        data: {
            labels: scoreData.map(row => row.area),
            datasets: [{
                label: "성취도",
                data: scoreData.map(row => row.score),
                backgroundColor: "rgba(54, 162, 235, 0.2)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });

    // PDF 다운로드 기능
    document.getElementById("pdf-download").addEventListener("click", () => {
        const element = document.body;
        html2pdf().from(element).save("성적표.pdf");
    });
});
