if (window.location.pathname === '/tedtalkslist') {
	fetch('api/v1/tedtalks?sort=created').then(function(res) {
			res.json().then(function(tedtalks) {
				console.log('tedtalks', tedtalks);
				tedtalks.forEach(function(tedtalks){
				var tbody = document.getElementById('entry');
					tbody.insertAdjacentHTML('beforeend', '<tr><td>' + '<a href="/list/' + tedtalks._id + '", class="red-text", style="font-size: 15px">' + tedtalks.title + '</td><td>' 
					+ '<a class="grey-text", style="font-size: 15px">' + tedtalks.uploader_name + '</td><td>' 
					+ '<a class="grey-text", style="font-size: 15px">' + tedtalks.views + '</td><td>' 
					+ '<a class="grey-text", style="font-size: 15px">' + tedtalks.created + '</td></tr>');
				});
	      		});
	    	});

	fetch('api/v1/tedtalks/count').then(function(res){
			res.json().then(function(count){
				console.log('count', count)
				var list = document.getElementById('totalCount');
				list.innerHTML = 'There are ' + count.count + ' TED talks';
			});
		});
}


