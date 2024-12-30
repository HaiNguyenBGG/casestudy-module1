const carData = [
    {
        make: 'Kia',
        model: 'Morning',
        type: 'Hatchback',
        year: 2024,
        colorOptions: ['Xanh lá', 'Trắng', 'Đen'],
        variants: [
            {
                name: 'AT 1.25 GT-Line',
                engine: '1.25L',
                transmission: 'Automatic',
                price: '',
                image: 'assets/images/kiaMorning/morningGTLine.jpg'
            },
            {
                name: 'AT 1.25 X-Line',
                engine: '1.25L',
                transmission: 'Automatic',
                price: '',
                image: 'assets/images/kiaMorning/morningXLine.jpg'
            },
            {
                name: 'MT 1.25',
                engine: '1.25L',
                transmission: 'Manual',
                price: '',
                image: 'assets/images/kiaMorning/morningMT.jpg'
            },
            {
                name: 'AT 1.25',
                engine: '1.25L',
                transmission: 'Automatic',
                price: '',
                image: 'assets/images/kiaMorning/morningAT.jpg'
            },
            {
                name: 'New Morning AT 1.25',
                engine: '1.25L',
                transmission: 'Automatic',
                price: '',
                image: 'assets/images/kiaMorning/morningNewAT.jpg'
            }
        ],
        features: [
            'Hệ thống an toàn',
            'Sạc không dây',
            'Apple CarPlay',
            'Android Auto',
            'Chế độ lái thể thao',
            'Điều hòa tự động',
            'Camera lùi'
        ]
    },
    {
        make: 'Kia',
        model: 'Soluto',
        type: 'Sedan',
        year: 2024,
        colorOptions: ['Trắng', 'Bạc', 'Đen', 'Đỏ'],
        variants: [
            {
                name: 'MT 1.4',
                engine: '1.4L',
                transmission: 'Manual',
                price: '',
                image: 'assets/images/kiaSoluto/solutoMT.jpg'
            },
            {
                name: 'MT 1.4 Deluxe',
                engine: '1.4L',
                transmission: 'Manual',
                price: '',
                image: 'assets/images/kiaSoluto/solutoMTDeluxe.jpg'
            },
            {
                name: 'AT 1.4',
                engine: '1.4L',
                transmission: 'Automatic',
                price: '',
                image: 'assets/images/kiaSoluto/solutoAT.jpg'
            },
            {
                name: 'AT 1.4 Deluxe',
                engine: '1.4L',
                transmission: 'Automatic',
                price: '',
                image: 'assets/images/kiaSoluto/solutoATDeluxe.jpg'
            }
        ],
        features: [
            'Hệ thống an toàn',
            'Màn hình cảm ứng',
            'Điều hòa tự động',
            'Camera lùi',
            'Apple CarPlay',
            'Android Auto'
        ]
    },
    {
        make: 'Kia',
        model: 'Sonet',
        type: 'SUV',
        year: 2024,
        colorOptions: ['Trắng', 'Xám', 'Đen', 'Đỏ'],
        variants: [
            {
                name: 'MT 1.5',
                engine: '1.5L',
                transmission: 'Manual',
                price: '',
                image: 'assets/images/kiaSonet/sonetMT.jpg'
            },
            {
                name: 'AT 1.5 Deluxe',
                engine: '1.5L',
                transmission: 'Automatic',
                price: '',
                image: 'assets/images/kiaSonet/sonetDeluxe.jpg'
            },
            {
                name: 'AT 1.5 Luxury',
                engine: '1.5L',
                transmission: 'Automatic',
                price: '',
                image: 'assets/images/kiaSonet/sonetLuxury.jpg'
            },
            {
                name: 'AT 1.5 Premium',
                engine: '1.5L',
                transmission: 'Automatic',
                price: '',
                image: 'assets/images/kiaSonet/sonetPremium.jpg'
            }
        ],
        features: [
            'Màn hình cảm ứng',
            'Hệ thống an toàn',
            'Điều hòa tự động',
            'Apple CarPlay',
            'Android Auto'
        ]
    },
    {
        make: 'Kia',
        model: 'Seltos',
        type: 'SUV',
        year: 2024,
        colorOptions: ['Trắng', 'Xám', 'Đen', 'Đỏ'],
        variants: [
            {
                name: 'MT 1.4 Deluxe',
                engine: '1.4L',
                transmission: 'Manual',
                price: '',
                image: 'assets/images/kiaSeltos/seltosMTDeluxe.jpg'
            },
            {
                name: 'AT 1.4 Luxury',
                engine: '1.4L',
                transmission: 'Automatic',
                price: '',
                image: 'assets/images/kiaSeltos/seltosATLuxury.jpg'
            },
            {
                name: 'AT 1.4 Premium',
                engine: '1.4L',
                transmission: 'Automatic',
                price: '',
                image: 'assets/images/kiaSeltos/seltosATPremium.jpg'
            },
            {
                name: 'AT 1.6 Turbo Premium',
                engine: '1.6L Turbo',
                transmission: 'Automatic',
                price: '',
                image: 'assets/images/kiaSeltos/seltosTurboPremium.jpg'
            }
        ],
        features: [
            'Màn hình cảm ứng',
            'Camera lùi',
            'Điều hòa tự động',
            'Cruise Control',
            'Apple CarPlay',
            'Android Auto',
            'Ghế da cao cấp'
        ]
    },
    {
        make: 'Kia',
        model: 'K3',
        type: 'Sedan',
        year: 2024,
        colorOptions: ['Trắng', 'Bạc', 'Đen', 'Đỏ'],
        variants: [
            {
                name: 'MT',
                engine: '1.6L',
                transmission: 'Manual',
                price: '',
                image: 'assets/images/kiaK3/k3MT.jpg'
            },
            {
                name: 'AT 1.6 Luxury',
                engine: '1.6L',
                transmission: 'Automatic',
                price: '',
                image: 'assets/images/kiaK3/k3Luxury.jpg'
            },
            {
                name: 'AT 1.6 Premium',
                engine: '1.6L',
                transmission: 'Automatic',
                price: '',
                image: 'assets/images/kiaK3/k3Premium.jpg'
            },
            {
                name: 'AT 2.0 Premium',
                engine: '2.0L',
                transmission: 'Automatic',
                price: '',
                image: 'assets/images/kiaK3/k3Premium20.jpg'
            }
        ],
        features: [
            'Màn hình cảm ứng',
            'Camera lùi',
            'Điều hòa tự động',
            'Cruise Control',
            'Apple CarPlay',
            'Android Auto'
        ]
    },
    {
        make: 'Kia',
        model: 'K5',
        type: 'Sedan',
        year: 2024,
        colorOptions: ['Đỏ', 'Trắng', 'Bạc', 'Xám'],
        variants: [
            {
                name: 'AT 2.0 Luxury',
                engine: '2.0L',
                transmission: 'Automatic',
                price: '',
                image: 'assets/images/kiaK5/k5Luxury.jpg'
            },
            {
                name: 'AT 2.0 Premium',
                engine: '2.0L',
                transmission: 'Automatic',
                price: '',
                image: 'assets/images/kiaK5/k5Premium20.jpg'
            },
            {
                name: 'AT 2.5 Premium',
                engine: '2.5L',
                transmission: 'Automatic',
                price: '',
                image: 'assets/images/kiaK5/k5Premium25.jpg'
            }
        ],
        features: [
            'Màn hình cảm ứng',
            'Hệ thống an toàn',
            'Camera 360',
            'Điều hòa tự động',
            'Apple CarPlay',
            'Android Auto',
            'Điều khiển giọng nói'
        ]
    },
    {
        make: 'Kia',
        model: 'Carnival',
        type: 'Minivan',
        year: 2024,
        colorOptions: ['Bạc', 'Trắng', 'Đỏ', 'Xanh'],
        variants: [
            {
                name: 'AT 2.2 Turbo Luxury Máy dầu',
                engine: '2.2L Turbo',
                transmission: 'Automatic',
                price: '',
                image: 'assets/images/kiaCarnival/carnivalLuxuryDiesel.jpg'
            },
            {
                name: 'AT 2.2 Turbo Premium Máy dầu',
                engine: '2.2L Turbo',
                transmission: 'Automatic',
                price: '',
                image: 'assets/images/kiaCarnival/carnivalPremiumDiesel.jpg'
            },
            {
                name: 'AT 2.2 Turbo Signature Máy dầu 7 ghế',
                engine: '2.2L Turbo',
                transmission: 'Automatic',
                price: '',
                image: 'assets/images/kiaCarnival/carnivalSignatureDiesel7.jpg'
            },
            {
                name: 'AT 2.2 Turbo Signature Máy dầu 8 ghế',
                engine: '2.2L Turbo',
                transmission: 'Automatic',
                price: '',
                image: 'assets/images/kiaCarnival/carnivalSignatureDiesel8.jpg'
            },
            {
                name: 'AT 3.5 Signature Máy xăng',
                engine: '3.5L',
                transmission: 'Automatic',
                price: '',
                image: 'assets/images/kiaCarnival/carnivalSignaturePetrol.jpg'
            }
        ],
        features: [
            'Ghế chỉnh điện',
            'Điều hòa tự động',
            'Màn hình giải trí cho hàng ghế sau',
            'Cửa trượt điện',
            'Apple CarPlay',
            'Android Auto'
        ]
    },
    {
        make: 'Kia',
        model: 'Sorento',
        type: 'SUV',
        year: 2024,
        colorOptions: ['Trắng', 'Xanh', 'Bạc', 'Đen'],
        variants: [
            {
                name: 'AT 2.2 Turbo Deluxe Máy dầu',
                engine: '2.2L Turbo',
                transmission: 'Automatic',
                price: '',
                image: 'assets/images/kiaSorento/sorentoDeluxeDiesel.jpg'
            },
            {
                name: 'AT 2.2 Turbo Luxury Máy dầu',
                engine: '2.2L Turbo',
                transmission: 'Automatic',
                price: '',
                image: 'assets/images/kiaSorento/sorentoLuxuryDiesel.jpg'
            },
            {
                name: 'AT 2.2 Turbo Premium Máy dầu',
                engine: '2.2L Turbo',
                transmission: 'Automatic',
                price: '',
                image: 'assets/images/kiaSorento/sorentoPremiumDiesel.jpg'
            },
            {
                name: 'AT 2.2 Turbo Signature Máy dầu 6 ghế',
                engine: '2.2L Turbo',
                transmission: 'Automatic',
                price: '',
                image: 'assets/images/kiaSorento/sorentoSignatureDiesel6.jpg'
            },
            {
                name: 'AT 2.2 Turbo Signature Máy dầu 7 ghế',
                engine: '2.2L Turbo',
                transmission: 'Automatic',
                price: '',
                image: 'assets/images/kiaSorento/sorentoSignatureDiesel7.jpg'
            },
            {
                name: 'AT 2.5 Luxury Máy xăng',
                engine: '2.5L',
                transmission: 'Automatic',
                price: '',
                image: 'assets/images/kiaSorento/sorentoLuxuryPetrol.jpg'
            },
            {
                name: 'AT 2.5 Premium Máy xăng',
                engine: '2.5L',
                transmission: 'Automatic',
                price: '',
                image: 'assets/images/kiaSorento/sorentoPremiumPetrol.jpg'
            },
            {
                name: 'AT 2.5 Signature Máy xăng 6 ghế',
                engine: '2.5L',
                transmission: 'Automatic',
                price: '',
                image: 'assets/images/kiaSorento/sorentoSignaturePetrol6.jpg'
            },
            {
                name: 'AT 2.5 Signature Máy xăng 7 ghế',
                engine: '2.5L',
                transmission: 'Automatic',
                price: '',
                image: 'assets/images/kiaSorento/sorentoSignaturePetrol7.jpg'
            }
        ],
        features: [
            '3 hàng ghế',
            'Hệ thống an toàn',
            'Màn hình cảm ứng',
            'Camera 360',
            'Điều hòa tự động',
            'Apple CarPlay',
            'Android Auto'
        ]
    }
];