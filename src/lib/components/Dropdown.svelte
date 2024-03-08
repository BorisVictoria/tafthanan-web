<!DOCTYPE html>
<html>

<head>
    <title>Dropdown</title>
    <style>
        .dropdown {
            display: inline-block;
            position: relative;
            width: 10%;
        }

        .dropdown-content {
            display: none;
            position: absolute;
            width: 100%;
            overflow: auto;
            box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.4);
        }

        .dropdown.open .dropdown-content {
            display: block;
        }

        .dropdown-content a {
            display: block;
            color: #000000;
            padding: 5px;
            text-decoration: none;
        }

        .dropdown-content a:hover {
            color: #FFFFFF;
            background-color: #00A4BD;
        }
    </style>
</head>

<body>
    <div class="dropdown" onclick="toggleDropdown()">
        <button>...</button>
        <div class="dropdown-content">
            <a href="#">Edit</a>
            <a href="#">Delete</a>
            <a href="#">Hide</a>
        </div>
    </div>

    <script>
        function toggleDropdown() {
            var dropdown = document.querySelector('.dropdown');
            dropdown.classList.toggle('open');
        }
    </script>
</body>

</html>