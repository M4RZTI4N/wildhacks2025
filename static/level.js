function showOutput(level) {
    let outputText = '';
    if (level === 'beginner') {
        outputText = "You're just getting started! Don't worry, we've got plenty of resources to help you learn the basics. Let’s dive into some tutorials and build your foundation.";
    } else if (level === 'intermediate') {
        outputText = "Great! You're comfortable with the basics. Let's take it to the next level with some more challenging projects and concepts.";
    } else if (level === 'advanced') {
        outputText = "Awesome! You're ready for some advanced topics. Let's explore the deeper aspects and start building complex applications.";
    } else if (level === 'expert') {
        outputText = "Impressive! You’re at the top of your game. Let’s challenge you with cutting-edge technologies and real-world project builds.";
    }
    document.getElementById('output').innerHTML = outputText;
  }