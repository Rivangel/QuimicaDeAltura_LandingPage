
Add-Type -AssemblyName System.Drawing

$targetFiles = @(
    "lush Veracruz mountain vegetation.png",
    "elder's hands holding a medicinal herb.png",
    "Panoramic shot of the Altas Montañas region.png",
    "stylized map of Latin America with botanical nodes.png",
    "A community scene.png",
    "warm workspace .png",
    "A marketplace or vendor scene.png"
)

$baseDir = "public\resources\images"

foreach ($filename in $targetFiles) {
    $fullPath = Join-Path $baseDir $filename
    
    if (Test-Path $fullPath) {
        Write-Host "Optimizing $filename..."
        try {
            $img = [System.Drawing.Image]::FromFile($fullPath)
            
            # Target width 1000px
            $newWidth = 1000
            $newHeight = [int]($img.Height * ($newWidth / $img.Width))
            
            if ($img.Width -gt $newWidth) {
                $bmp = New-Object System.Drawing.Bitmap($newWidth, $newHeight)
                $graph = [System.Drawing.Graphics]::FromImage($bmp)
                
                $graph.CompositingQuality = "HighQuality"
                $graph.SmoothingMode = "HighQuality"
                $graph.InterpolationMode = "HighQualityBicubic"
                
                # Fill with white background to handle transparency
                $graph.Clear([System.Drawing.Color]::White)
                
                $graph.DrawImage($img, 0, 0, $newWidth, $newHeight)
                
                $jpgEncoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
                $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
                $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, 80)
                
                $newFilename = $filename -replace "\.png$", ".jpg"
                $newPath = Join-Path $baseDir $newFilename
                
                $bmp.Save($newPath, $jpgEncoder, $encoderParams)
                
                $bmp.Dispose()
                $graph.Dispose()
                $img.Dispose()
                
                Write-Host "Created $newFilename"
                
                # We can delete the original now
                Remove-Item $fullPath -Force
            } else {
                Write-Host "Skipping $filename (width <= 1000)"
                $img.Dispose()
            }
        } catch {
            Write-Error "Error processing $filename: $_"
        }
    } else {
        Write-Warning "File not found: $filename"
    }
}
