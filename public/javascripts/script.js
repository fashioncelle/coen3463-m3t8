if (window.location.pathname === '/tedtalkslist') {
	fetch('api/v1/tedtalks/count').then(function(res){
			res.json().then(function(count){
				console.log('count', count)
				var list = document.getElementById('totalCount');
				list.innerHTML = 'There are ' + count.count + ' TED talks';
			});
		});
}