// Mythium Archive: https://archive.org/details/mythium/

jQuery(function ($) {
    'use strict'
    var supportsAudio = !!document.createElement('audio').canPlayType;
    if (supportsAudio) {
        // initialize plyr
        var player = new Plyr('#audio1', {
            controls: [
                'restart',
                'play',
                'progress',
                'current-time',
                'duration',
                'mute',
                'volume'
                // 'download'
            ]
        });


        // initialize playlist and controls
        var index = 0,
            playing = false,
            // mediaPath = 'https://archive.org/download/mythium/', this is the original song path from music player template
            mediaPath = 'https://borneid.com/audio/',
            extension = '',
            tracks = [{
                "image": "<img src='https://borneid.com/covers-images-final/Believe.jpg' alt='Believe by Cumber' />",
                "track": 1,
                "name": "Believe",
                "duration": "3:26",
                "file": "Believe-short"
            }, {
                "image": "<img src='https://borneid.com/covers-images-final/Miracle.jpg' alt='Miracle by Cumber' />",
                "track": 2,
                "name": "Miracle",
                "duration": "3:59",
                "file": "Miracle-short"
            }, {
                "image": "<img src='https://borneid.com/covers-images-final/FastAndFurious.jpg' alt='Fast and Furious by Cumber' />",
                "track": 3,
                "name": "Fast and Furious",
                "duration": "3:40",
                "file": "Fast_and_Furious-short"
            }, {
                "image": "<img src='https://borneid.com/covers-images-final/Cassava.jpg' alt='Cassava by Cumber' />",
                "track": 4,
                "name": "Cassava",
                "duration": "3:44",
                "file": "Cassava-short"
            }, {
                "image": "<img src='https://borneid.com/covers-images-final/DrunkInLove.jpg' alt='Drunk in Love by Cumber' />",
                "track": 5,
                "name": "Drunk in Love",
                "duration": "4:26",
                "file": "Drunk_In_Love-short"
            }, {
                "image": "<img src='https://borneid.com/covers-images-final/Bugashi.jpg' alt='Bugashi by Cumber' />",
                "track": 6,
                "name": "Bugashi",
                "duration": "3:48",
                "file": "Bugashi-short"
            }, {
                "image": "<img src='https://borneid.com/covers-images-final/WhoDemLockOutside.jpg' alt='Who Dem Lock Outside by Cumber (feat.) JayDrillz' />",
                "track": 7,
                "name": "Who Dem Lock Outside",
                "duration": "3:36",
                "file": "Who_Dem_Lock_Outside-short"
            }, {
                "image": "<img src='https://borneid.com/covers-images-final/BadmanThing.jpg' alt='Bad Man Thing by Cumber' />",
                "track": 8,
                "name": "Bad Man Thing",
                "duration": "3:19",
                "file": "Bad_Man_Thing-short"
            }, {
                "image": "<img src='https://borneid.com/covers-images-final/OutofControl.jpg' alt='Out of Control by Cumber' />",
                "track": 9,
                "name": "Out of Control",
                "duration": "4:26",
                "file": "Out_of_Control-short"
            }, {
                "image": "<img src='https://borneid.com/covers-images-final/Mapouka.jpg' alt='Mapouka by Cumber' />",
                "track": 10,
                "name": "Mapouka",
                "duration": "3:37",
                "file": "Mapouka-short"
            }, {
                "image": "<img src='https://borneid.com/covers-images-final/AiyeForieng.jpg' alt='Aiye Forieng by Cumber' />",
                "track": 11,
                "name": "Aiye Forieng",
                "duration": "3:06",
                "file": "Aiye_Forieng-short"
            }],
            buildPlaylist = $.each(tracks, function(key, value) {
                var trackNumber = value.track,
                    trackImage = value.image,
                    trackName = value.name,
                    trackDuration = value.duration;
                if (trackNumber.toString().length === 1) {
                    trackNumber = '0' + trackNumber;
                }
                $('#plList').append('<li> \
                    <div class="plItem"> \
                        <div class="item-wrapper">\
                            <div class="plImg">' + trackImage + '</div> \
                            <div class="item-info">\
                                <div class="helper"></div> \
                                <div class="plNum">' + trackNumber + '.</div> \
                                <div class="plTitle">' + trackName + '</div> \
                                <div class="plLength">' + trackDuration + '</div> \
                </li>');
            }),

            trackCount = tracks.length,
            npAction = $('#npAction'),
            npTitle = $('#npTitle'),
            audio = $('#audio1').on('play', function () {
                playing = true;
                npAction.text('now playing');
            }).on('pause', function () {
                playing = false;
                npAction.text('paused...');
            }).on('ended', function () {
                npAction.text('paused...');
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    audio.play();
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }).get(0),
            btnPrev = $('#btnPrev').on('click', function () {
                if ((index - 1) > -1) {
                    index--;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            btnNext = $('#btnNext').on('click', function () {
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            li = $('#plList li').on('click', function () {
                var id = parseInt($(this).index());
                if (id !== index) {
                    playTrack(id);
                }
            }),
            loadTrack = function (id) {
                $('.plSel').removeClass('plSel');
                $('#plList li:eq(' + id + ')').addClass('plSel');
                npTitle.text(tracks[id].name);
                index = id;
                audio.src = mediaPath + tracks[id].file + extension;
                updateDownload(id, audio.src);
            },
            updateDownload = function (id, source) {
                player.on('loadedmetadata', function () {
                    $('a[data-plyr="download"]').attr('href', source);
                });
            },
            playTrack = function (id) {
                loadTrack(id);
                audio.play();
            };
        extension = audio.canPlayType('audio/mpeg') ? '.mp3' : audio.canPlayType('audio/ogg') ? '.ogg' : '';
        loadTrack(index);
    } else {
        // no audio support
        $('.column').addClass('hidden');
        var noSupport = $('#audio1').text();
        $('.musiccontainer').append('<p class="no-support">' + noSupport + '</p>');
    }
});
