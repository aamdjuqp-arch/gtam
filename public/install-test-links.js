// سكريبت لإنشاء روابط اختبار تلقائياً
(function() {
  'use strict';

  console.log('🔗 تثبيت روابط الاختبار...');

  const testLinks = [
    {
      id: 'pl_test_sa_aramex',
      data: {
        id: 'pl_test_sa_aramex',
        type: 'shipping',
        country_code: 'SA',
        service_key: 'aramex',
        service_name: 'Aramex',
        cod_amount: 500,
        status: 'active',
        created_at: new Date().toISOString()
      }
    },
    {
      id: 'pl_test_ae_dhl',
      data: {
        id: 'pl_test_ae_dhl',
        type: 'shipping',
        country_code: 'AE',
        service_key: 'dhl',
        service_name: 'DHL',
        cod_amount: 750,
        status: 'active',
        created_at: new Date().toISOString()
      }
    },
    {
      id: 'pl_test_kw_smsa',
      data: {
        id: 'pl_test_kw_smsa',
        type: 'shipping',
        country_code: 'KW',
        service_key: 'smsa',
        service_name: 'SMSA',
        cod_amount: 300,
        status: 'active',
        created_at: new Date().toISOString()
      }
    }
  ];

  // Save each test link
  testLinks.forEach(link => {
    try {
      localStorage.setItem(`payment_link_${link.id}`, JSON.stringify(link.data));
      console.log(`✅ تم إنشاء: ${link.id}`);
    } catch (e) {
      console.error(`❌ خطأ في إنشاء ${link.id}:`, e);
    }
  });

  console.log(`🎉 تم تثبيت ${testLinks.length} رابط اختبار`);
  console.log('💡 يمكنك الآن زيارة:');
  testLinks.forEach(link => {
    console.log(`   ${window.location.origin}/standalone-pay/${link.id}`);
  });

  // Create test customer info
  localStorage.setItem('customerInfo', JSON.stringify({
    name: 'أحمد محمد علي',
    email: 'ahmed@example.com',
    phone: '0551234567',
    address: 'الرياض، المملكة العربية السعودية'
  }));

  console.log('✅ تم حفظ بيانات العميل التجريبية');
})();
