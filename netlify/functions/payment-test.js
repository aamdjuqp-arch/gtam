export default async (req, res) => {
  const url = new URL(req.url);
  const path = url.pathname;
  
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  
  const testResults = `
<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>فحص صفحات الدفع - Payment Pages Diagnosis</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Almarai:wght@300;400;700;800&display=swap" rel="stylesheet">
    <style>
        body { 
            font-family: 'Almarai', Arial, sans-serif; 
            padding: 20px; 
            background: #0f172a; 
            color: white;
            line-height: 1.8;
        }
        .container { 
            max-width: 1000px; 
            margin: 0 auto; 
        }
        .test-box {
            background: rgba(30, 41, 59, 0.8);
            border: 2px solid #0ea5e9;
            padding: 20px;
            margin: 20px 0;
            border-radius: 10px;
        }
        .test-link { 
            display: block; 
            padding: 15px; 
            margin: 10px 0; 
            background: linear-gradient(135deg, #1e293b, #0f172a);
            border-radius: 8px; 
            color: #0ea5e9; 
            text-decoration: none; 
            border: 2px solid #0ea5e9;
            transition: all 0.3s;
        }
        .test-link:hover { 
            background: #0ea5e9; 
            color: white; 
            transform: translateX(-5px);
        }
        .status {
            padding: 15px;
            border-radius: 8px;
            margin: 15px 0;
            font-weight: bold;
        }
        .success { background: rgba(16, 185, 129, 0.2); border: 2px solid #10b981; }
        .warning { background: rgba(234, 179, 8, 0.2); border: 2px solid #eab308; }
        .error { background: rgba(220, 38, 38, 0.2); border: 2px solid #dc2626; }
        pre {
            background: rgba(0, 0, 0, 0.5);
            padding: 15px;
            border-radius: 8px;
            overflow-x: auto;
            direction: ltr;
        }
        h1, h2 { color: #0ea5e9; }
        .result {
            background: rgba(59, 130, 246, 0.1);
            border: 2px solid #3b82f6;
            padding: 15px;
            border-radius: 8px;
            margin: 10px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🔍 تشخيص صفحات الدفع - Payment Pages Diagnosis</h1>
        
        <div class="status success">
            ✅ تم تحميل صفحة التشخيص بنجاح
        </div>

        <h2>🌐 معلومات الطلب - Request Information</h2>
        <div class="result">
            <strong>المسار - Path:</strong> ${path}<br>
            <strong>التاريخ - Date:</strong> ${new Date().toISOString()}<br>
            <strong>User Agent:</strong> ${req.headers['user-agent'] || 'Unknown'}
        </div>

        <h2>🧪 اختبار الروابط - Test Links</h2>
        <p>انقر على الروابط التالية لاختبار صفحات الدفع:</p>
        
        <a href="/standalone-pay/test-123" class="test-link">
            🔗 Test Link #1: /standalone-pay/test-123
        </a>
        
        <a href="/standalone-pay/xyz-456" class="test-link">
            🔗 Test Link #2: /standalone-pay/xyz-456
        </a>
        
        <a href="/standalone-pay/demo-payment-789" class="test-link">
            🔗 Test Link #3: /standalone-pay/demo-payment-789
        </a>

        <h2>📊 التحقق من التكوين - Configuration Check</h2>
        <div class="test-box">
            <h3>_redirects File Content:</h3>
            <pre># This should be available in /_redirects
/r/*    /.netlify/functions/microsite-meta    200
/pay/*    /.netlify/functions/microsite-meta    200
/standalone-pay/*    /index.html   200
/*    /index.html   200</pre>
        </div>

        <div class="test-box">
            <h3>JavaScript Console Check:</h3>
            <p>افتح أدوات المطور (F12) وتحقق من:</p>
            <ul>
                <li>Console: يجب ألا توجد أخطاء باللون الأحمر</li>
                <li>Network: جميع الملفات يجب أن تكون 200</li>
                <li>Elements: يجب وجود عناصر داخل #root</li>
            </ul>
        </div>

        <div class="test-box">
            <h3>Expected vs Actual Results:</h3>
            <ul>
                <li><strong>Expected:</strong> صفحة نموذج المستلم مع حقول الإدخال</li>
                <li><strong>Expected:</strong> عنوان "معلومات المستلم"</li>
                <li><strong>Expected:</strong> حقول: الاسم، البريد، الهاتف، العنوان</li>
                <li><strong>Expected:</strong> زر "التالي" أزرق</li>
                <li><strong>Not Expected:</strong> شاشة بيضاء فارغة</li>
            </ul>
        </div>

        <div class="status warning">
            <strong>📝 ملاحظة:</strong> إذا ظهرت شاشة بيضاء، افتح Console (F12) وراجع الأخطاء
        </div>

        <div class="test-box">
            <h3>Manual Test Steps:</h3>
            <ol>
                <li>انقر على أي رابط اختبار أعلاه</li>
                <li>انتظر تحميل الصفحة</li>
                <li>إذا ظهرت شاشة بيضاء، اضغط F12 لفتح Console</li>
                <li>ابحث عن أخطاء باللون الأحمر</li>
                <li>تأكد من أن جميع ملفات JS/CSS تحمل بدون أخطاء</li>
            </ol>
        </div>
    </div>

    <script>
        // Track page load
        window.addEventListener('load', function() {
            console.log('✅ Diagnosis page loaded');
            console.log('Path:', window.location.pathname);
            console.log('Timestamp:', new Date().toISOString());
            
            // Check if React app is present
            const rootDiv = document.getElementById('root');
            if (rootDiv) {
                console.log('✓ Root div found');
            } else {
                console.error('✗ Root div NOT found!');
            }
            
            // Check for React DevTools
            if (window.React) {
                console.log('✓ React detected');
            } else {
                console.log('ℹ React not detected in window (normal in production)');
            }
        });

        // Track link clicks
        document.querySelectorAll('.test-link').forEach(link => {
            link.addEventListener('click', function(e) {
                console.log('🔗 Clicked:', this.href);
                console.log('⏱ Timestamp:', new Date().toISOString());
            });
        });
    </script>
</body>
</html>
  `;
  
  res.statusCode = 200;
  res.end(testResults);
};
