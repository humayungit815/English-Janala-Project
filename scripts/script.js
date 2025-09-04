const lessonBtn = () => {
	fetch("https://openapi.programming-hero.com/api/levels/all")
		.then(res => res.json())
		.then(data => {
			for (let lesson of data.data) {
				// console.log(lesson);

				const lessonContainer = document.getElementById("lesson-container");
				// console.log(lessonContainer);
				const btn = document.createElement("button");
				btn.innerHTML = `
                <button class="lesson-btn btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i>Lesson ${lesson.level_no}</button>
                `;

				btn.addEventListener("click", () => {
					// console.log(btn);
					const url = `https://openapi.programming-hero.com/api/level/${lesson.level_no}`;
					fetch(url)
						.then(res => res.json())
						.then(details => {
							// console.log(details.data);
							const wordContainer = document.getElementById("word-container");
							wordContainer.innerHTML = "";

							for (let word of details.data) {
								console.log(word);
								const div = document.createElement("div");
								div.innerHTML = `
								<div class=" bg-[white] p-10 shadow-lg rounded-lg text-center">
								<h1 class="text-xl font-bold">${word.word}</h1>
								<p class="font-semibold py-4">Meaning /Pronounciation</p>
								<h1 class="text-base font-semibold">"${word.meaning}/ ${word.pronunciation}"</h1>
								</div>
								`;
								wordContainer.append(div);
							}
						});
				});

				lessonContainer.append(btn);
			}
		});
};
lessonBtn();
