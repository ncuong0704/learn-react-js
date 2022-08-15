import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/system';
import ListSong from './components/ListSong';


ALbumMp3Feature.propTypes = {
    
};

function ALbumMp3Feature(props) {
    const albumList = [
        {
            image: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/8/2/d/c/82dce0d96abe764ad55cd0ecf75ecc0c.jpg",
            title: "Đỉnh Cao Trending",
            singer: "Nhiều nghệ sĩ",
            link: "https://zingmp3.vn/album/Dinh-Cao-Trending-Truc-Nhan-Dong-Nhi-Thieu-Bao-Tram-Duc-Phuc/ZABDOABU.html",
            id: 1,
        },
        {
            image: "https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/4/5/d/4/45d43335929474c2c635b756a3398a5f.jpg",
            title: "Ballad Việt Ngày Nay",
            singer: "Nhiều nghệ sĩ",
            link: "https://zingmp3.vn/album/Ballad-Viet-Ngay-Nay-Noo-Phuoc-Thinh-Vuong-Anh-Tu-Thieu-Bao-Tram-Khai-Dang/67WWC0AI.html",
            id: 2,
        },
        {
            image: "https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/9/9/8/d/998d940ed36d5b40a28309443ab85234.jpg",
            title: "K-Pop Solo",
            singer: "Nhiều nghệ sĩ",
            link: "https://zingmp3.vn/album/K-Pop-Solo-LISA-TAEYEON-KANG-DANIEL-JEON-SOMI/ZEUE0WZ8.html",
            id: 3,
        },
        {
            image: "https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/f/0/f/5/f0f56f7b73ee81f2480a122cf3dddd7f.jpg",
            title: "Chàng Trai Indie Việt",
            singer: "Nhiều nghệ sĩ",
            link: "https://zingmp3.vn/album/Chang-Trai-Indie-Viet-buitruonglinh-Madihu-Thai-Dinh-CHARLES/6I6C966U.html",
            id: 4,
        },
    ]
    return (
            <Box>
                <ListSong albumList={albumList} />
            </Box>
    );
}

export default ALbumMp3Feature;