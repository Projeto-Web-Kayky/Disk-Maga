package com.disk.api.utils;

import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;

import javax.imageio.ImageIO;

import org.springframework.web.multipart.MultipartFile;

public class ImageUtils {

    public static void saveCompressedImage(MultipartFile file, File outputFile) throws IOException {
        BufferedImage originalImage = ImageIO.read(file.getInputStream());

        // Redimensiona para 300x300
        BufferedImage resizedImage = new BufferedImage(300, 300, BufferedImage.TYPE_INT_RGB);
        Graphics2D g2d = resizedImage.createGraphics();
        g2d.drawImage(originalImage, 0, 0, 300, 300, null);
        g2d.dispose();

        // Salva como JPEG
        ImageIO.write(resizedImage, "jpg", outputFile);
    }
}
