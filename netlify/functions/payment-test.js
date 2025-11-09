exports.handler = async (event, context) => {
  const path = event.path || '/';

  const testResults = `<!DOCTYPE html>
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
            <strong>User Agent:</strong> ${event.headers?.['user-agent'] || 'Unknown'}
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
    </div>

    <script>
        window.addEventListener('load', function() {
            console.log('✅ Diagnosis page loaded');
        });
    </script>
</body>
</html>`;

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
    },
    body: testResults,
  };
};
