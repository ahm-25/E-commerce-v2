import type { HomepageData, Product } from '../types'

export const useMockData = () => {
  const mockProduct: Product = {
    id: 'p-luxury-bag-01',
    slug: 'luxury-leather-bag',
    name: 'حقيبة يد جلدية فاخرة بتصميم عصري',
    description: 'تجمع هذه الحقيبة بين الأناقة والعملية، مصنوعة من أجود أنواع الجلد الطبيعي مع تفاصيل معدنية فاخرة وتصميم عصري يناسب جميع إطلالاتك.',
    images: [
      { id: 'img1', url: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', alt: 'حقيبة أمامية' },
      { id: 'img2', url: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', alt: 'حقيبة جانبية' },
      { id: 'img3', url: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', alt: 'حقيبة تفاصيل' }
    ],
    price: 2499,
    compareAtPrice: 3499,
    currency: 'ج.م',
    rating: 4.8,
    reviewsCount: 124,
    category: { id: '3', name: 'الحقائب', image: '', slug: 'bags' },
    stock: 15,
    options: [
      {
        id: 'opt_color',
        name: 'اللون',
        type: 'color',
        values: [
          { id: 'val_beige', label: 'بيج', value: '#eaddd5' },
          { id: 'val_black', label: 'أسود', value: '#111111' },
          { id: 'val_brown', label: 'بني', value: '#8b5a2b' }
        ]
      },
      {
        id: 'opt_size',
        name: 'المقاس',
        type: 'size',
        values: [
          { id: 'val_s', label: 'صغير', value: 'S' },
          { id: 'val_m', label: 'متوسط', value: 'M' },
          { id: 'val_l', label: 'كبير', value: 'L' }
        ]
      }
    ],
    specifications: [
      { name: 'المادة', value: 'جلد طبيعي 100%' },
      { name: 'الأبعاد', value: '30 سم × 22 سم × 12 سم' },
      { name: 'الإغلاق', value: 'سحاب معدني' },
      { name: 'البطانة', value: 'قماش ناعم' }
    ],
    reviews: [
      { id: 'r1', author: 'نورة السالم', rating: 5, date: '12 أكتوبر 2023', content: 'حقيبة رائعة جداً، الجلد طبيعي وممتاز والمقاس مناسب للدوام.' },
      { id: 'r2', author: 'مريم أحمد', rating: 4, date: '5 نوفمبر 2023', content: 'جميلة وعملية، لكن تمنيت لو كان لونها أغمق قليلاً.' }
    ]
  }

  // Mapper for the homepage products
  const createSimpleProduct = (p: any): Product => ({
    id: p.id,
    slug: `product-${p.id}`,
    name: p.name,
    description: '',
    images: [{ id: `img-${p.id}`, url: p.image, alt: p.name }],
    price: p.price,
    compareAtPrice: p.compareAtPrice,
    currency: 'ج.م',
    rating: p.rating,
    reviewsCount: p.reviewsCount,
    stock: 10,
    badge: p.discount ? `خصم ${p.discount}%` : undefined
  })

  const mockData: HomepageData = {
    store: {
      name: 'Nexora',
      logo: '/logo.svg', // will just be text if missing
      description: 'نحن نؤمن بأن التفاصيل الصغيرة تصنع الفرق، لذلك نقدم لك منتجات تجمع بين جودة التصميم والمتانة.',
      socials: {
        facebook: '#',
        twitter: '#',
        instagram: '#'
      },
      contact: {
        phone: '+20 123 456 7890',
        email: 'support@nexora.com',
        address: 'القاهرة، مصر'
      }
    },
    hero: {
      title: 'تصاميم تلهم أسلوب حياتك',
      description: 'اكتشف أحدث المنتجات المختارة بعناية لتناسب ذوقك الرفيع.',
      image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      ctaText: 'تسوق الآن',
      ctaLink: '/products',
      type: 'split'
    },
    categories: [
      { id: '1', name: 'المنزل والديكور', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', slug: 'home-decor' },
      { id: '2', name: 'الملابس', image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', slug: 'clothing' },
      { id: '3', name: 'الحقائب', image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', slug: 'bags' },
      { id: '4', name: 'الأحذية', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', slug: 'shoes' },
      { id: '5', name: 'الجمال والعناية', image: 'https://images.unsplash.com/photo-1570194065650-d99fb4b73b17?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', slug: 'beauty' },
      { id: '6', name: 'الإلكترونيات', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', slug: 'electronics' },
      { id: '7', name: 'الإكسسوارات', image: 'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', slug: 'accessories' }
    ],
    featuredProducts: [
      {
        id: 'p1',
        name: 'عطر رجالي فاخر',
        price: 3499,
        rating: 4.9,
        reviewsCount: 348,
        image: 'https://images.unsplash.com/photo-1523293115678-d29062758dc4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 'p2',
        name: 'حقيبة ظهر أنيقة',
        price: 1299,
        rating: 4.5,
        reviewsCount: 76,
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 'p3',
        name: 'حذاء رياضي كلاسيك',
        price: 1799,
        rating: 4.6,
        reviewsCount: 210,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 'p4',
        name: 'سماعات لاسلكية',
        price: 2499,
        compareAtPrice: 3200,
        discount: 34,
        rating: 4.7,
        reviewsCount: 98,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 'p5',
        name: 'ساعة ذكية برو',
        price: 4999,
        compareAtPrice: 5999,
        discount: 20,
        rating: 4.8,
        reviewsCount: 124,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      }
    ].map(createSimpleProduct),
    promotionalBanner: {
      title: 'أحدث التقنيات بين يديك',
      description: 'اكتشف أفضل الأجهزة الإلكترونية بأسعار مميزة',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      ctaText: 'تسوق الآن',
      ctaLink: '/electronics',
      type: 'split'
    },
    bestSellers: [
      {
        id: 'b1',
        name: 'باور بانك',
        price: 699,
        rating: 4.6,
        reviewsCount: 50,
        image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 'b2',
        name: 'سماعات بلوتوث',
        price: 2199,
        rating: 4.8,
        reviewsCount: 130,
        image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 'b3',
        name: 'عطر نسائي',
        price: 3299,
        rating: 4.9,
        reviewsCount: 300,
        image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 'b4',
        name: 'ساعة ذكية',
        price: 4499,
        rating: 4.7,
        reviewsCount: 220,
        image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 'b5',
        name: 'حقيبة يد أنيقة',
        price: 2799,
        rating: 4.5,
        reviewsCount: 85,
        image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 'b6',
        name: 'حذاء رياضي',
        price: 1999,
        rating: 4.8,
        reviewsCount: 400,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      }
    ].map(createSimpleProduct),
    collections: [
      {
        id: 'c1',
        title: 'أناقة الخريف',
        description: 'اكتشف مجموعتنا الجديدة لموسم الخريف بتصاميم عصرية وألوان دافئة',
        image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        ctaText: 'تسوق التشكيلة',
        ctaLink: '/collections/autumn',
        layout: 'large'
      },
      {
        id: 'c2',
        title: 'الأجهزة المنزلية الذكية',
        description: 'حول منزلك إلى مساحة ذكية مع أحدث الأجهزة',
        image: 'https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        ctaText: 'تصفح المزيد',
        ctaLink: '/collections/smart-home',
        layout: 'large'
      }
    ],
    testimonials: [
      {
        id: 't1',
        name: 'سارة أحمد',
        quote: 'تصميم عصري وجودة استثنائية، منتجات تستحق الأفضل دائماً',
        rating: 5,
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
        location: 'من أكثر من 10,000 عميل'
      }
    ]
  }

  const getProductBySlug = (slug: string) => {
    // For demo purposes, we return the mock detailed product 
    // if any slug is requested, except if we want to add more later.
    return mockProduct
  }

  return { mockData, mockProduct, getProductBySlug }
}
