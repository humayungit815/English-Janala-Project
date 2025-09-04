const lessonBtn = () => {
	fetch("https://openapi.programming-hero.com/api/levels/all")
		.then(res => res.json())
		.then(data => {
			for (let lesson of data.data) {
				// console.log(lesson);

				const lessonContainer = document.getElementById("lesson-container");
				// console.log(lessonContainer);

				const btn = document.createElement("button");
				btn.className = "lesson-btn btn btn-outline btn-primary";
				btn.innerHTML = `<i class="fa-solid fa-book-open"></i> Lesson ${lesson.level_no}`;

				// const btn = document.createElement("button");
				// btn.innerHTML = `
				// <button class="lesson-btn btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i>Lesson ${lesson.level_no}</button>
				// `;

				btn.addEventListener("click", () => {
					// console.log(btn);

					const allBtns = document.getElementsByClassName("lesson-btn");
					for (let allBtn of allBtns) {
						// console.log(allBtn);
						allBtn.classList.remove("bg-[#422AD5]", "text-[white]");
					}
					btn.classList.add("bg-[#422AD5]", "text-[white]");
					const url = `https://openapi.programming-hero.com/api/level/${lesson.level_no}`;
					fetch(url)
						.then(res => res.json())
						.then(details => {
							// console.log(details.data);

							const wordContainer = document.getElementById("word-container");
							wordContainer.innerHTML = "";

							if (details.data.length == 0) {
								wordContainer.innerHTML = `
								 <div class="text-center py-10 col-span-full mx-auto">
								 <img class="w-[90px] mx-auto" src="./assets/alert-error.png" />
                                 <p class="font-bangla text-lg font-semibold text-[#79716b]">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                                 <h1 class="text-3xl font-bold font-bangla mt-5">নেক্সট Lesson এ যান</h1>
                                 </div>
								`;
								return;
							}

							for (let word of details.data) {
								// console.log(word.id);
								const div = document.createElement("div");
								div.innerHTML = `
								<div class=" bg-[white] p-10 shadow-lg rounded-lg text-center">
								<h1 class="text-xl font-bold word-text">${
									word.word ? word.word : "শব্দ খুঁজে পাওয়া যায় নি"
								}</h1>
								<p class="font-semibold py-4">Meaning /Pronounciation</p>
								<h1 class="text-base font-semibold">"${
									word.meaning ? word.meaning : "অর্থ খুঁজে পাওয়া যায় নি"
								}/ ${
									word.pronunciation
										? word.pronunciation
										: "pronunciation খুঁজে পাওয়া যায় নি"
								}"</h1>
								<div class="flex justify-between mt-10">
								<button onClick="loadDetails(${
									word.id
								})" class="btn circle-btn"><i class="fa-solid fa-circle-info cursor-pointer"></i></button>
								<button class="btn volume-btn"><i class="fa-solid fa-volume-high cursor-pointer"></i></button>
								
								</div>
								</div>
								
								`;

								//
								const volumeBtn = div.querySelector(".volume-btn");
								volumeBtn.addEventListener("click", () => {
									const text = div.querySelector(".word-text").innerText;
									const utterance = new SpeechSynthesisUtterance(text);
									speechSynthesis.speak(utterance);
								});
								//

								wordContainer.append(div);
							}
						});
				});

				lessonContainer.append(btn);
			}
		});
};

const loadDetails = id => {
	const url = `https://openapi.programming-hero.com/api/word/${id}`;
	// console.log(url);
	fetch(url)
		.then(res => res.json())
		.then(details => {
			console.log(details.data.word);
			const modal = document.getElementById("modal");
			modal.innerHTML = "";
			// console.log(modal);
			const div = document.createElement("div");
			div.innerHTML = `
			 <h3 class="mb-5 text-lg font-bold">${details.data.word} (<i class="fa-solid fa-microphone-lines"></i>: ${details.data.pronunciation})</h3>
            <div class="">
			<p class="font-bold mb-2">Meaning</p>
			<p class="font-medium">${details.data.meaning}</p>
			</div>
            <div class="mt-5">
			<p class="font-bold mb-2">Example</p>
			<p>${details.data.sentence}</p>
			</div>
            <div class="mt-5">
			<p class="font-bold mb-2">সমার্থক শব্দ গুলো</p>
			<button class="btn">${details.data.synonyms[0]}</button>
			<button class="btn mx-3">${details.data.synonyms[1]}</button>
			<button class="btn">${details.data.synonyms[2]}</button>
			</div>
			`;
			document.getElementById("my_modal_5").showModal();
			modal.append(div);
		});
};

lessonBtn();
