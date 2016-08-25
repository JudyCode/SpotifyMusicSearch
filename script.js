var offset = 0;
var limit = 10;
var hasNextPage = true;

function explore() {
	offset = 0;
	getSearch();
}

function getUrl() {
	var parameters = ['artist', 'song', 'album', 'genre', 'year'];
	var url = "https://api.spotify.com/v1/search?type=track&limit="
		+ limit + "&q=";
	parameters.forEach(function(para) {
		var val = document.getElementById(para).value;
		if (val) {
			url = url.concat(para + ":" + val + "%20");
		}
	})
	return url.concat("&offset=" + offset);	
}

function newLine(item, i) {
	return "<div class='music-row'>" + 
				"<div style='background-image:url(" + item.album.images[2].url + ")' class='cover'></div>" + 
				"<div><div class='track-name'>" + (offset + i + 1) + ": " + item.name + "</div>" +
					"<audio controls><source src="+ item.preview_url + "></audio></div>" + 
			"</div>";
}

function listResult() {
	return "</br><button onclick='getPrev()' style='background-color:transparent; border-color:transparent;'><img src='prev.png'/></button>" +
			"<span> " + 'page ' + (offset / 10 + 1) + " </span>" +
			"<button onclick='getNext()' style='background-color:transparent; border-color:transparent;'><img src='next.png'/></button>";
}


function getNext() {
	if (hasNextPage) {
		offset = offset + limit;
		getSearch();
	}
}

function getPrev() {
	if (offset == 0) {
		return;
	}
	offset = offset - limit;
	getSearch();
}

function getSearch() {
	$.ajax({
		'url': getUrl(),
		'dataType': 'json',
		'success': function(data) {
			$("#resultList").html("");
			if (data['tracks']['items'] != null && data['tracks']['items'].length != 0) {
				data['tracks']['items'].forEach(function(item, i) {
					$("#resultList").append(newLine(item, i));
				});
				hasNextPage = true;
			} else {
				$("#resultList").append("<p style='font-size:20px'><i>No results</i></p>");
				hasNextPage = false;
			}
			$("#resultList").append(listResult());
		}
	})
}
