(() => {

	let theThumbnails = document.querySelectorAll('#buttonHolder img'),
		gameBoard = document.querySelector('.puzzle-board'),
		pzlPieces = document.querySelectorAll('.puzzle-pieces img'),
		dropZones = document.querySelectorAll('.drop-zone');
		resetPieces = document.querySelector(".puzzle-pieces");


	const imageNames = ['topLeft', 'topRight', 'bottomLeft', 'bottomRight'];
	
	function changeImageSet() {
		gameBoard.style.backgroundImage = `url(images/backGround${this.dataset.bgref}.jpg)`;
		console.log('change thumbnails');

		// bug 2 = Reset the puzzle when the thumbnail were clikcked
		imageNames.forEach((piece, index) => {
			pzlPieces[index].src = `images/${piece + this.dataset.bgref}.jpg`;
			resetPieces.appendChild(pzlPieces[index]); 
		});
	}

	function allowDrag(event) {
		console.log('started draggin me');
		event.dataTransfer.setData('draggedEl', this.id);
	}

	function allowDragOver(event) {
		event.preventDefault();
		console.log('started draggin over me');
	}

	function allowDrop(event) {
		event.preventDefault();		
		// bug 1 = this function will not allow to drop more images if the value is more than 0
		if (this.children.length >= 1) { return;}
		let droppedElId = event.dataTransfer.getData('draggedEl');
		this.appendChild(document.querySelector(`#${droppedElId}`));
	}

	theThumbnails.forEach(image => image.addEventListener('click', changeImageSet));
	pzlPieces.forEach(piece => piece.addEventListener('dragstart', allowDrag));

	dropZones.forEach(zone => {
		zone.addEventListener('dragover', allowDragOver);
		zone.addEventListener('drop', allowDrop);
	});
})();