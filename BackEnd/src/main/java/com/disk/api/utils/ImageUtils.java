package com.disk.api.utils;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import net.coobird.thumbnailator.Thumbnails;
import javax.imageio.ImageIO;


public class ImageUtils {
    public static void saveCompressedImage(File sourceFile, File destinationFile) throws IOException {
        BufferedImage image = ImageIO.read(sourceFile);

        Thumbnails.of(image)
                .size(300, 300)
                .outputQuality(0.8)
                .toFile(destinationFile);
    }
}
